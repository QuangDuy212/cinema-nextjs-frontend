"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, SelectProps, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { callDeleteRoleById, callFetchAllPermissions, callFetchAllRoles } from "src/util/api";
import ModalCreateRole from "./modal/modal.create.role";
import ModalViewRole from "./modal/modal.view.role";
import ModalUpdateRole from "./modal/modal.update.role";
import Access from "src/components/share/access";
import { ALL_PERMISSIONS } from "src/config/permissions";

const AdminRole = () => {
    // STATE: 
    const [data, setData] = useState<IRole[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [sortQuery, setSortQuery] = useState<string>("");

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const [dataInit, setDataInit] = useState<IRole | undefined>();
    const [listPer, setListPer] = useState<IPermission[]>([]);

    const [listPermissions, setListPermissions] = useState<{
        module: string;
        permissions: IPermission[]
    }[] | null>(null);


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
            width: "35%",
            key: "name"
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: true,
            width: "50%",
            key: "description"
        },
        // {
        //     title: 'Permission',
        //     dataIndex: 'permissions',
        //     sorter: true,
        //     width: "50%",
        //     key: "permissions",
        //     render: (text: any, record: any, index: any, action: any) => {
        //         return (
        //             <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        //                 {record?.permissions?.map((p: IPermission) => {
        //                     return (
        //                         <div key={p?.id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "4px" }}>
        //                             {p?.name}-{p?.module}
        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //         )
        //     },
        // },
        {
            title: 'Active',
            dataIndex: 'active',
            sorter: true,
            width: "5%",
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Tag color={!record?.active ? "volcano" : "green"} >
                            {record?.active?.toString()}
                        </Tag>
                    </div>
                )
            },
        },

        {
            title: 'Action',
            width: "15%",
            key: "action",
            render: (_value: any, entity: any, _index: any, _action: any) => (
                <Space>
                    < Access
                        permission={ALL_PERMISSIONS.ROLES.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                                cursor: "pointer"
                            }}
                            type=""
                            onClick={() => handleUpdate(entity)}
                        />
                    </Access >

                    <Access
                        permission={ALL_PERMISSIONS.ROLES.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            //@ts-ignore
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
                    </Access>
                    <FaEye style={{
                        fontSize: 20,
                        color: '#ccc',
                        cursor: "pointer"
                    }}
                        onClick={() => handleView(entity)}
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

    const fetchRole = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllRoles(query);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleCreate = () => {
        setOpenModalCreate(true);
    }

    const handleUpdate = (role: IRole) => {
        setDataInit(role);
        setOpenModalUpdate(true);
    }

    const handleView = (role: IRole) => {
        setDataInit(role);
        setOpenModalView(true);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteRoleById(id);
            //@ts-ignore
            if (+res.statusCode === 200) {
                message.success('Xóa User thành công');
                fetchRole();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    //@ts-ignore
                    description: res.message
                });
            }
        }
    }



    //SELECT: 
    const options: SelectProps['options'] = listPer?.map((i: IPermission) => {
        var label = i?.name ?? "";
        label += ("-" + i?.module);
        return {
            value: i?.id,
            label: label,
        }
    });

    const fetchPer = async () => {
        const res = await callFetchAllPermissions("?page=1&size=100");
        if (res && res?.data) {
            const data = res?.data?.result;
            setListPer(data);
        }

    }

    // EFFECT:
    useEffect(() => {
        fetchRole();
    }, [page, size]);

    //EFFECT :
    useEffect(() => {
        fetchPer();
    }, [])

    useEffect(() => {
        const init = async () => {
            const res = await callFetchAllPermissions(`page=1&size=100`);
            if (res.data?.result) {
                setListPermissions(res.data?.result)
            }
        }
        init();
    }, [])
    return (
        <>
            <Access
                permission={ALL_PERMISSIONS.ROLES.CREATE}
                hideChildren
            >
                <div style={{ marginBottom: "10px" }}>
                    <Button type='primary'
                        icon={<IoAddCircleOutline />}
                        onClick={() => handleCreate()}
                    >
                        <> </>Thêm mới
                    </Button>
                </div>
            </Access>
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

            <ModalCreateRole
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchData={fetchRole}
                options={options}
            />

            <ModalViewRole
                openModalView={openModalView}
                setOpenModalView={setOpenModalView}
                fetchData={fetchRole}
                data={dataInit}
            />

            <ModalUpdateRole
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchData={fetchRole}
                data={dataInit}
                setData={setDataInit}
                options={options}
                listPermissions={listPermissions}
            />
        </>
    )
}
export default AdminRole;