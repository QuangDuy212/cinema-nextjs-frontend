"use client"

import { Button, ConfigProvider, message, notification, Popconfirm, Popover, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import { callDeleteUser, callFetchAllUsers } from "src/util/api";
import 'src/styles/admin/user/app.admin.user.scss'
import Access from "src/components/share/access";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ALL_PERMISSIONS } from "src/config/permissions";
import { IoAddCircleOutline } from "react-icons/io5";
import ModalCreateUser from "./modal/modal.create.user";
import ModalDetailUser from "./modal/modal.detail.user";
import ModalUpdateUser from "./modal/modal.update.user";

const AppAdminUser = () => {

    // STATE: 
    const [data, setData] = useState<IUser[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [isSearch, setIsSearch] = useState<boolean>(false);

    const [openModalNewUser, setOpenModalNewUser] = useState<boolean>(false);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [openModaUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IUser | null>(null);

    const [sortQuery, setSortQuery] = useState<string>("");


    // EFFECT:
    useEffect(() => {
        fetchUser();
    }, [page, size]);

    const titleDelete = (
        <>
            <span className='del-title'><MdInfoOutline className='del-icon' />
                <> </> Xác nhận xóa
            </span>
        </>
    )

    const columns: any = [
        {
            title: 'STT',
            key: 'index',
            width: "5%",
            align: "center",
            render: (text: any, record: any, index: any) => {
                return (
                    <>
                        {(index + 1) + (page - 1) * (size)}
                    </>)
            },
            hideInSearch: true,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            width: "5%",
            key: 'id',
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true,
            width: "10%",
            key: "fullName"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            width: "20%",
            key: "fullName"

        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true,
            width: "20%",
            key: "phone"
        },
        {
            title: 'Address',
            dataIndex: "address",
            sorter: true,
            width: "20%",
            key: "address",
        },

        {
            title: 'Action',
            width: "20%",
            key: "action",
            render: (_value: any, entity: any, _index: any, _action: any) => (
                <Space>
                    {/* < Access
                        permission={ALL_PERMISSIONS.USERS.UPDATE}
                        hideChildren
                    > */}
                    <EditOutlined
                        style={{
                            fontSize: 20,
                            color: '#ffa500',
                            cursor: "pointer"
                        }}
                        type=""
                        onClick={() => {
                            setOpenModalUpdate(true);
                            setDataInit(entity);
                        }}
                    />
                    {/* </Access > */}

                    {/* <Access
                        permission={ALL_PERMISSIONS.USERS.DELETE}
                        hideChildren
                    > */}
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa user"}
                        description={"Bạn có chắc chắn muốn xóa user này ?"}
                        onConfirm={() => handleDeleteUser(entity.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{ cursor: "pointer", margin: "0 10px" }}>
                            <DeleteOutlined
                                style={{
                                    fontSize: 20,
                                    color: '#ff4d4f',
                                    cursor: "pointer"
                                }}
                            />
                        </span>
                    </Popconfirm>
                    {/* </Access> */}
                    <FaEye style={{
                        fontSize: 20,
                        color: '#ccc',
                        cursor: "pointer"
                    }}
                        onClick={() => handleOnView(entity)}
                    />
                </Space >
            ),

        }

    ];

    const fetchUser = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllUsers(query);
        console.log(">> check res: ", res)
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleTableChange = (pagination: { size: number, page: number }, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.page !== page)
            setPage(pagination.page);
        if (pagination && pagination.size !== size) {
            setPage(1);
            setSize(pagination.size);
        }

        // `dataSource` is useless since `pageSize` changed
        if (pagination.size !== size) {
            setData([]);
        }

        if (sorter && sorter.field) {
            if (sorter.order == 'ascend') {
                setSortQuery(`&sort=${sorter.field}`)
            }

            if (sorter.order == 'descend') {
                setSortQuery(`&sort=-${sorter.field}`)
            }
        }
    };

    const handleDeleteUser = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteUser(id);
            console.log(".>> check res: ", res);
            if (+res.statusCode === 200) {
                message.success('Xóa User thành công');
                fetchUser();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleNewUser = () => {
        setOpenModalNewUser(true);
    }

    const handleOnView = (data: IUser) => {
        setOpenViewDetail(true);
        setDataInit(data);
    }

    return (
        <>
            <div style={{ marginBottom: "10px" }}>
                <Button type='primary'
                    icon={<IoAddCircleOutline />}
                    onClick={() => handleNewUser()}>
                    <> </>Thêm mới
                </Button>
            </div>
            <Table
                dataSource={data ?? []}
                columns={columns}
                pagination={{
                    current: page,
                    pageSize: size,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) =>
                        <div>{range[0]} - {range[1]} trên {total} dòng</div>
                }}
                loading={loading}
                onChange={handleTableChange}
            />
            <ModalCreateUser
                openModalNewUser={openModalNewUser}
                setOpenModalNewUser={setOpenModalNewUser}
                fetchData={fetchUser}
            />
            <ModalDetailUser
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                data={dataInit}
            />
            <ModalUpdateUser
                openModaUpdate={openModaUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchUser={fetchUser}
                data={dataInit}
            />
        </>
    )
}

export default AppAdminUser;