'use client'

import '../../app/page.module.css'
import '../../styles/header/app.header.scss'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import "antd/dist/antd.css";
import ActiveLink from './active.link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
    {
        label: <a href="/profile">Thông tin cá nhân</a>,
        key: '0',
    },
    {
        label: <a href="/logout">Đăng xuất</a>,
        key: '1',
    },
];

const AppHeader = () => {
    // redux:
    const user = useSelector((state: RootState) => state.account.user);
    const isAuthenticated = useSelector((state: RootState) => state.account.isAuthenticated);
    const dispatch = useDispatch()

    //lib:
    const router = useRouter();


    return (
        <>
            <div style={{ backgroundColor: "#10151b", position: "fixed", zIndex: "1000", width: "100vw" }}>
                <div className="container"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ display: "flex", padding: "15px 0", gap: "30px" }} className='nav-link'>
                        <img src='https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75' style={{ height: "50px", width: "70px" }} />
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
                                        <span>{user.name ? user.name : "Người dùng"}</span>
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default AppHeader;