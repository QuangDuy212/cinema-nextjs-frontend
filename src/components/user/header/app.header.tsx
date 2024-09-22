'use client'

import 'src/app/page.module.css'
import 'src/styles/header/app.header.scss'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import "antd/dist/antd.css";
import ActiveLink from './active.link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { callFetchAccount, callLogout } from 'src/util/api';
import { setLogoutAction } from 'src/redux/slice/accountSlide';
import Link from 'next/link';
import { IoMenu } from "react-icons/io5";



const AppHeader = () => {
    // redux:
    const user = useSelector((state: RootState) => state.account.user);
    const isAuthenticated = useSelector((state: RootState) => state.account.isAuthenticated);
    const dispatch = useDispatch()

    //lib:
    const router = useRouter();

    // dropdown
    const items: MenuProps['items'] = [
        {
            label: <Link href="/profile">Thông tin cá nhân</Link>,
            key: '0',
        },
        {
            label: <span onClick={() => { handleLogout() }}>Đăng xuất</span>,
            key: '1',
        },
    ];


    //STATE: 

    const [isClient, setIsClient] = useState<boolean>(false);

    //METHOD: 
    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res && +res?.statusCode === 200) {
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            router.push("/")
        }
    }

    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 1200px)")?.matches;// check mobile device
    }

    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <>
            {
                (!isMobile && isClient)
                    ?
                    <div style={{ backgroundColor: "#10151b", position: "fixed", zIndex: "1000", width: "100vw", top: 0, left: 0 }}>
                        <div className="container"
                            style={{ display: "flex", justifyContent: "space-between" }}
                        >
                            <div style={{ display: "flex", padding: "15px 0", gap: "30px" }} className='nav-link'>
                                <img src="/home/logo.png" style={{ height: "50px", width: "70px" }} />
                                <ActiveLink href="/">Trang chủ</ActiveLink>
                                <ActiveLink href="/movies" >Lịch chiếu</ActiveLink>
                                <ActiveLink href="/news-list" >Tin tức</ActiveLink>
                                <ActiveLink href="/promotions" >Khuyến mãi</ActiveLink>
                                <ActiveLink href="/ticket-price" >Giá vé</ActiveLink>
                                <ActiveLink href="/festivals" >Liên hoan phim</ActiveLink>
                                <ActiveLink href="/about" >Giới thiệu</ActiveLink>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px" }}>
                                {!isAuthenticated ?
                                    <span
                                        onClick={() => router.push("/auth/signin")}
                                        style={{ color: "#fff", cursor: "pointer" }}
                                    >Đăng nhập</span>
                                    :

                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}
                                            style={{ color: "#fff" }}
                                        >
                                            <Space>
                                                <span>{user.fullName ? user.fullName : "Người dùng"}</span>
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }

                            </div>
                        </div>
                    </div>
                    :
                    <div style={{ backgroundColor: "#10151b", position: "fixed", zIndex: "1000", width: "100vw", top: 0, left: 0 }}>
                        <div
                            style={{ padding: "0 16px", display: "flex", justifyContent: "space-between" }}
                        >
                            <div style={{ display: "flex", padding: "15px 0", gap: "4px" }} className='nav-link'>
                                <img src="/home/logo.png" style={{ height: "40px", width: "53px", objectFit: "contain" }} />
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#fff" }}>TRUNG TÂM CHIẾU PHIM QUỐC GIA</span>
                                    <span style={{ fontSize: "12px", fontWeight: 300, color: "#fff" }}>National Cinema Center</span>
                                </div>
                            </div>
                            <div style={{ color: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <IoMenu style={{ fontSize: "40px" }} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default AppHeader;