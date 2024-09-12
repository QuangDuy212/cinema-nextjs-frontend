"use client"

import { Button, ConfigProvider, Popover, Table } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import { callFetchAllUsers } from "src/util/api";
import 'src/styles/admin/user/app.admin.user.scss'

const AppAdminUser = () => {

    // STATE: 
    const [data, setData] = useState<IUser[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);


    // EFFECT:
    useEffect(() => {
        fetchUser();
        console.log(">> check data: ", data)
    }, [page, size]);

    const titleDelete = (
        <>
            <span className='del-title'><MdInfoOutline className='del-icon' />
                <> </> Xác nhận xóa
            </span>
        </>
    )

    const columns = [
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
            width: "25%",
            key: "action",
            render: (text: string, record: any, index: number) => {
                return (
                    <>
                        <div className='action'>
                            <ConfigProvider>
                                <Popover
                                    placement="rightTop"
                                    title={titleDelete}
                                    trigger={"click"}
                                    content={
                                        <div className='del-content'>
                                            <Button
                                                type='primary'
                                                className='confirm'
                                            // onClick={() => handleDelete(record._id)}
                                            >Xác nhận</Button>
                                        </div>
                                    }
                                >
                                    <span className='del-btn'>
                                        <MdDelete />
                                    </span>
                                </Popover>
                            </ConfigProvider>
                            <span className='view-btn'
                            // onClick={() => handleOnView(record)}
                            >
                                <FaEye />
                            </span>
                            <span
                                className='update-btn'
                            // onClick={() => handleUpdate(record)}
                            >
                                <LuPenLine />
                            </span>
                        </div>
                    </>
                )
            }
        }

    ];

    const fetchUser = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;

        // if (querySearch) {
        //     query += querySearch;
        // }

        // if (sortQuery) {
        //     query += sortQuery;
        // }


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

        // if (sorter && sorter.field) {
        //     if (sorter.order == 'ascend') {
        //         setSortQuery(`&sort=${sorter.field}`)
        //     }

        //     if (sorter.order == 'descend') {
        //         setSortQuery(`&sort=-${sorter.field}`)
        //     }
        // }
    };

    return (
        <>
            <Table
                dataSource={data}
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
        </>
    )
}

export default AppAdminUser;