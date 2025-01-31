"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { callDeleteHistoryById, callFetchAllHistories } from "src/util/api";
import ModalViewHistory from "./modal/modal.view.history";
import Access from "src/components/share/access";
import { ALL_PERMISSIONS } from "src/config/permissions";

const AdminHistory = () => {
    // STATE: 
    const [data, setData] = useState<IHistory[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [sortQuery, setSortQuery] = useState<string>("");

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const [dataInit, setDataInit] = useState<IHistory | undefined>();

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
            title: 'Action',
            width: "15%",
            key: "action",
            render: (_value: any, entity: any, _index: any, _action: any) => (
                <Space>
                    <Access
                        permission={ALL_PERMISSIONS.HISTORIES.DELETE}
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

    const fetchHistory = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllHistories(query);
        if (res && res?.data && res?.data?.result) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleView = (his: IHistory) => {
        setDataInit(his);
        setOpenModalView(true);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteHistoryById(id);
            //@ts-ignore
            if (+res.statusCode === 200) {
                message.success('Xóa Delete thành công');
                fetchHistory();
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
        fetchHistory();
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
            <ModalViewHistory
                openModalView={openModalView}
                setOpenModalView={setOpenModalView}
                fetchData={fetchHistory}
                data={dataInit}
            />
        </>
    )
}
export default AdminHistory;