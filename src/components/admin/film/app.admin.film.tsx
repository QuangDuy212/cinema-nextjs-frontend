"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, SelectProps, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { callDeleteFilmById, callFetchAllCategories, callFetchAllFilms } from "src/util/api";
import ModalCreateFilm from "./modal/modal.create.film";
import ModalViewFilm from "./modal/modal.view.film";

const AdminFilm = () => {
    // STATE: 
    const [data, setData] = useState<IFilm[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);
    const [sortQuery, setSortQuery] = useState<string>("");

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalView, setOpenModalView] = useState<boolean>(false);

    const [dataInit, setDataInit] = useState<IFilm | undefined>();
    const [cateOptions, setCateOptions] = useState<ICategory[] | undefined>([]);

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "5%",
            key: 'id',
        },
        {
            title: 'Khởi chiếu',
            dataIndex: "premiere",
            sorter: true,
            width: "10%",
            key: "premiere",
        },
        {
            title: 'Tên phim',
            dataIndex: 'name',
            sorter: true,
            width: "50%",
            key: "name"
        },
        {
            title: 'Phút',
            dataIndex: 'duration',
            sorter: true,
            width: "5%",
            key: "duration"
        },
        {
            title: 'Active',
            dataIndex: 'active',
            sorter: true,
            width: "10%",
            key: "active",
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

    const fetchFilm = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callFetchAllFilms(query);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const fetchCategoryOptions = async () => {
        const res = await callFetchAllCategories("?page=1&size=1000");
        if (res && res?.data && res?.data?.result) {
            setCateOptions(res?.data?.result);
        }
    }

    //SELECT: 
    const categoriesOptions: SelectProps['options'] = cateOptions?.map((i: ICategory) => {
        return {
            value: i?.id,
            label: i?.name,
        }
    });

    const handleCreate = () => {
        setOpenModalCreate(true);
    }

    const handleUpdate = (film: IFilm) => {
        setDataInit(film);
        setOpenModalUpdate(true);
    }

    const handleView = (film: IFilm) => {
        setDataInit(film);
        setOpenModalView(true);
    }

    const handleDelete = async (id: number | undefined) => {
        if (id) {
            const res = await callDeleteFilmById(id);
            //@ts-ignore
            if (+res.statusCode === 200) {
                message.success('Xóa User thành công');
                fetchFilm();
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
        fetchFilm();
    }, [page, size]);

    useEffect(() => {
        fetchCategoryOptions();
    }, []);


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
            <ModalCreateFilm
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchData={fetchFilm}
                categoriesOptions={categoriesOptions}
            />
            <ModalViewFilm
                openModalView={openModalView}
                setOpenModalView={setOpenModalView}
                fetchData={fetchFilm}
                data={dataInit}
            />
        </>
    )
}
export default AdminFilm;