"use client"

import { Button, ConfigProvider, message, notification, Popconfirm, Popover, SelectProps, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import { callDeleteUser, callFetchAllRoles, callFetchAllUsers } from "src/util/api";
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
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IUser | null>(null);

    const [sortQuery, setSortQuery] = useState<string>("");
    const [listRoles, setListRoles] = useState<IRole[] | undefined>([]);


    // EFFECT:
    useEffect(() => {
        fetchUser();
    }, [page, size]);

    useEffect(() => {
        fetchRole();
    }, [])

    const titleDelete = (
        <>
            <span className='del-title'><MdInfoOutline className='del-icon' />
                <> </> Xác nhận xóa
            </span>
        </>
    )

    const columns: any = [
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
            key: "email"

        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true,
            width: "20%",
            key: "phone"
        },
        {
            title: 'Role',
            dataIndex: ["role", "name"],
            sorter: true,
            width: "10%",
            key: "role",
        },
        {
            title: 'Active',
            dataIndex: "active",
            sorter: true,
            width: "10%",
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{record?.active?.toString()}</>
                )
            },
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
                        //@ts-ignore
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
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    //SELECT: 
    const roleOptions: SelectProps['options'] = listRoles?.map((i: IRole) => {
        return {
            value: i?.id,
            label: i?.name,
        }
    });

    const fetchRole = async () => {
        const res = await callFetchAllRoles("?page=1&size=100");
        if (res && res?.data) {
            const data = res?.data?.result;
            setListRoles(data);
        }

    }

    const handleTableChange = (pagination: { pageSize: number, current: number }, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current !== page)
            setPage(pagination.current);
        if (pagination && pagination.pageSize !== size) {
            setPage(1);
            setSize(pagination.pageSize);
        }

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== size) {
            setData([]);
        }

        if (sorter && sorter.field) {
            if (sorter.order == 'ascend') {
                setSortQuery(`&sort=${sorter.field}`)
            }

            if (sorter.order == 'descend') {
                setSortQuery(`&sort=${sorter.field},desc`)
            }
        }
    };

    const handleDeleteUser = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteUser(id);
            //@ts-ignore
            if (+res.statusCode === 200) {
                message.success('Xóa User thành công');
                fetchUser();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    //@ts-ignore
                    description: res?.message
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
                //@ts-ignore
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
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchUser={fetchUser}
                data={dataInit}
                roleOptions={roleOptions}
            />
        </>
    )
}

export default AppAdminUser;