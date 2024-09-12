"use client"

import { Table } from "antd";
import { useEffect, useState } from "react";

const AppAdminUser = () => {

    // STATE: 
    const [data, setData] = useState<IModelPaginate<IUser>>();
    const [loading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(2);
    const [total, setTotal] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);


    // EFFECT:
    useEffect(() => {

    }, [])

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
            />
        </>
    )
}

export default AppAdminUser;