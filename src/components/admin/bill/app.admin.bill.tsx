"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, SelectProps, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { callDeleteBillById, callFetchAllBill } from "src/util/api";
import ModalViewBill from "./modal/modal.view.bill";

const AdminBill = () => {
    // STATE: 
    const [data, setData] = useState<IBill[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [sortQuery, setSortQuery] = useState<string>("");

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const [dataInit, setDataInit] = useState<IBill | undefined>();
    const [listPer, setListPer] = useState<IPermission[]>([]);

    // VARIABLE: 
    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "5%",
            key: 'id',
        },
        {
            title: 'Film',
            dataIndex: 'nameFilm',
            sorter: true,
            width: "55%",
            key: "nameFilm"
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: true,
            width: "5%",
            key: "quantity"

        },

        {
            title: 'Total',
            dataIndex: 'total',
            sorter: true,
            width: "10%",
            key: "total"

        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            width: "10%",
            key: "status"

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

    const fetchBill = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllBill(query);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleCreate = () => {
        setOpenModalCreate(true);
    }

    const handleUpdate = (bill: IBill) => {
        setDataInit(bill);
        setOpenModalUpdate(true);
    }

    const handleView = (bill: IBill) => {
        setDataInit(bill);
        setOpenModalView(true);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteBillById(id);
            //@ts-ignore
            if (+res.statusCode === 200) {
                message.success('Xóa Delete thành công');
                fetchBill();
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
        fetchBill();
    }, [page, size]);

    return (
        <>
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
            <ModalViewBill
                openModalView={openModalView}
                setOpenModalView={setOpenModalView}
                data={dataInit}
                fetchData={fetchBill}
            />
        </>
    )
}
export default AdminBill;