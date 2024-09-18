'use client'
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import { callFetchAllBill, callFetchAllFilms, callFetchAllUsers } from "src/util/api";
const DashboardPage = () => {
    const [countUser, setCountUser] = useState<number>(0);
    const [countFilm, setCountFilm] = useState<number>(0);
    const [countBill, setCountBill] = useState<number>(0);

    const fetchUsers = async () => {
        const user = await callFetchAllUsers("?page=1&size=1000");
        const activeUser = user?.data?.result?.filter((i: IUser) => i?.active === true)
        setCountUser(activeUser?.length);
    }

    const fetchFilms = async () => {
        const films = await callFetchAllFilms("?page=1&size=1000");
        const activeFilms = films?.data?.result?.filter((i: IFilm) => i?.active === true)
        setCountFilm(activeFilms?.length);
    }

    const fetchBills = async () => {
        const user = await callFetchAllBill("?page=1&size=1000");
        setCountBill(user?.data?.result?.length);
    }

    useEffect(() => {
        fetchUsers();
        fetchFilms();
        fetchBills();
    }, [])
    const formatter = (value: number | string) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    return (
        <Row gutter={[20, 20]}>
            <Col span={24} md={8}>
                <Card title="User quantity" bordered={false} >
                    <Statistic
                        title="Quantity"
                        value={countUser}
                        formatter={formatter}
                    />

                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Film quantity" bordered={false} >
                    <Statistic
                        title="Quantity"
                        value={countFilm}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Bill quantity" bordered={false} >
                    <Statistic
                        title="Quantity"
                        value={countBill}
                        formatter={formatter}
                    />
                </Card>
            </Col>

        </Row>
    )
}
export default DashboardPage;