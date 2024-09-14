"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { callDeletePermission, callFetchAllPermissions } from "src/util/api";
import ModalCreatePer from "./modal/modal.create.per";
import ModalUpdatePer from "./modal/modal.update.per";

const AdminPermission = () => {
    // STATE: 
    const [data, setData] = useState<IPermission[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [sortQuery, setSortQuery] = useState<string>("");

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const [dataInit, setDataInit] = useState<IPermission | undefined>();

    // VARIABLE: 
    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "5%",
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: "10%",
            key: "name"
        },
        {
            title: 'API path',
            dataIndex: 'apiPath',
            sorter: true,
            width: "20%",
            key: "apiPath"

        },
        {
            title: 'Method',
            dataIndex: 'method',
            sorter: true,
            width: "20%",
            key: "method"
        },
        {
            title: 'Module',
            dataIndex: "module",
            sorter: true,
            width: "20%",
            key: "module",
        },

        {
            title: 'Action',
            width: "15%",
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
                        onClick={() => handleUpdate(entity)}
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
                        onConfirm={() => handleDelete(entity.id)}
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
                    // onClick={() => handleOnView(entity)}
                    />
                </Space >
            ),

        }

    ];


    //METHODS: 
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

    const fetchPer = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllPermissions(query);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleCreate = () => {
        setOpenModalCreate(true);
    }

    const handleUpdate = (per: IPermission) => {
        setDataInit(per);
        setOpenModalUpdate(true);
    }

    const handleView = (per: IPermission) => {
        setDataInit(per);
        setOpenModalView(true);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id) {
            const res = await callDeletePermission(id);
            if (+res.statusCode === 200) {
                message.success('Xóa User thành công');
                fetchPer();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    // EFFECT:
    useEffect(() => {
        fetchPer();
    }, [page, size]);


    return (
        <>
            <div style={{ marginBottom: "10px" }}>
                <Button type='primary'
                    icon={<IoAddCircleOutline />}
                    onClick={() => handleCreate()}
                >
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
            <ModalCreatePer
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchData={fetchPer}
            />
            <ModalUpdatePer
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchData={fetchPer}
                data={dataInit}
            />
        </>
    )
}
export default AdminPermission;