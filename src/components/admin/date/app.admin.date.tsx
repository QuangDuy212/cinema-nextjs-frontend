"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, SelectProps, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { callDeleteTimeById, callFetchAllShows, callFetchAllTimes } from "src/util/api";
import ModalCreateDate from "./modal/moda.create.date";
import ModalUpdateDate from "./modal/modal.update.data";

const AdminDate = () => {
    // STATE: 
    const [data, setData] = useState<ITime[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [sortQuery, setSortQuery] = useState<string>("");

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const [dataInit, setDataInit] = useState<ITime | undefined>();

    // VARIABLE: 
    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "5%",
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: true,
            width: "10%",
            key: "date"
        },
        {
            title: 'Shows',
            dataIndex: 'shows',
            sorter: true,
            width: "30%",
            key: "shows",
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <div style={{ display: "flex" }}>
                        {record?.shows?.map((item: { id: number, time: string }, index: number) => {
                            return (
                                <div key={item?.id}
                                    style={{ padding: "4px", border: "1px solid #ccc", marginRight: "2px", borderRadius: "5px" }}
                                >{item?.time}</div>
                            )
                        })}
                    </div>
                )
            },

        },
        {
            title: 'Active',
            dataIndex: 'active',
            sorter: true,
            width: "10%",
            key: "active",
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{record?.active?.toString()}</>
                )
            },
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
                    {/* </Access> */}
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

    const fetchTime = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllTimes(query);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleCreate = () => {
        setOpenModalCreate(true);
    }

    const handleUpdate = (time: ITime) => {
        setDataInit(time);
        setOpenModalUpdate(true);
    }

    const handleView = (time: ITime) => {
        setDataInit(time);
        setOpenModalView(true);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteTimeById(id);
            //@ts-ignore
            if (+res.statusCode === 200) {
                message.success('Xóa Date thành công');
                fetchTime();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    //@ts-ignore
                    description: res.message
                });
            }
        }
    }




    // EFFECT:
    useEffect(() => {
        fetchTime();
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
                //@ts-ignore
                onChange={handleTableChange}
            />
            <ModalCreateDate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchData={fetchTime}
            />
            <ModalUpdateDate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchData={fetchTime}
                data={dataInit}
            />
        </>
    )
}
export default AdminDate;