"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, SelectProps, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { render } from "sass";
import { callDeleteShow, callFetchAllFilms, callFetchAllShows, callFetchAllTimes } from "src/util/api";
import { formatter } from "src/util/method";
import ModalViewShow from "./modal/modal.view.show";
import ModalCreateShow from "./modal/modal.create.show";
import ModalUpdateShow from "./modal/modal.update.show";
import Access from "src/components/share/access";
import { ALL_PERMISSIONS } from "src/config/permissions";

const AdminShow = () => {
    // STATE: 
    const [data, setData] = useState<IShow[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);

    const [sortQuery, setSortQuery] = useState<string>("");

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const [dataInit, setDataInit] = useState<IShow | undefined>();
    const [days, setDays] = useState<ITime[] | undefined>([]);
    const [films, setFilms] = useState<IFilm[] | undefined>([]);

    // VARIABLE: 
    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "5%",
            key: 'id',
        },
        {
            title: 'Zoom number',
            dataIndex: 'zoomNumber',
            sorter: true,
            width: "15%",
            key: "zoomNumber"
        },
        {
            title: 'Time',
            dataIndex: 'time',
            sorter: true,
            width: "10%",
            key: "time"
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: true,
            width: "10%",
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{formatter.format(record?.price)}</>
                )
            },
        },
        {
            title: 'Day',
            dataIndex: "day",
            sorter: true,
            width: "10%",
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{record?.day?.date}</>
                )
            },
        },
        {
            title: 'Film',
            dataIndex: "film",
            sorter: true,
            width: "35%",
            render: (text: any, record: any, index: any, action: any) => {
                return (
                    <>{record?.film?.name}</>
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
                        permission={ALL_PERMISSIONS.SHOWS.UPDATE}
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
                        permission={ALL_PERMISSIONS.SHOWS.DELETE}
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

    const fetchShow = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllShows(query);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleCreate = () => {
        setOpenModalCreate(true);
    }

    const handleUpdate = (show: IShow) => {
        setDataInit(show);
        setOpenModalUpdate(true);
    }

    const handleView = (show: IShow) => {
        setDataInit(show);
        setOpenModalView(true);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteShow(id);
            //@ts-ignore
            if (+res.statusCode === 200) {
                message.success('Xóa User thành công');
                fetchShow();
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
    const daysOptions: SelectProps['options'] = days?.map((i: ITime) => {
        return {
            value: i?.id,
            label: i?.date,
        }
    });

    const filmsOptions: SelectProps['options'] = films?.map((i: IFilm) => {
        return {
            value: i?.id,
            label: i?.name,
        }
    });

    const fetchDaysOptions = async () => {
        const res = await callFetchAllTimes("?page=1&size=100");
        if (res && res?.data) {
            const data = res?.data?.result;
            setDays(data);
        }

    }

    const fetchFilmsOptions = async () => {
        const resFilms = await callFetchAllFilms("?page=1&size=100");
        if (resFilms && resFilms?.data) {
            const data = resFilms?.data?.result;
            setFilms(data);
        }
    }

    // EFFECT:
    useEffect(() => {
        fetchShow();
    }, [page, size]);

    useEffect(() => {
        fetchDaysOptions();
        fetchFilmsOptions();
    }, [])


    return (
        <>
            <Access
                permission={ALL_PERMISSIONS.SHOWS.CREATE}
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
            <ModalViewShow
                openModalView={openModalView}
                setOpenModalView={setOpenModalView}
                data={dataInit}
                fetchData={fetchShow}
            />
            <ModalCreateShow
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchData={fetchShow}
                daysOptions={daysOptions}
                filmsOptions={filmsOptions}
            />
            <ModalUpdateShow
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchData={fetchShow}
                daysOptions={daysOptions}
                filmsOptions={filmsOptions}
                data={dataInit}
            />
        </>
    )
}
export default AdminShow;