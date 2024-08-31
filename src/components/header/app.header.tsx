'use client'

import '../../app/page.module.css'
import '../../styles/header/app.header.scss'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import "antd/dist/antd.css";

const items: MenuProps['items'] = [
    {
        label: <a href="https://www.antgroup.com">Thông tin cá nhân</a>,
        key: '0',
    },
    {
        label: <a href="https://www.aliyun.com">Đăng xuất</a>,
        key: '1',
    },
];

const AppHeader = () => {
    return (
        <>
            <div style={{ backgroundColor: "#10151b", position: "fixed", zIndex: "1000", width: "100%" }}>
                <div className="container"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ display: "flex", padding: "15px 0", gap: "30px" }}>
                        <img src='https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75' style={{ height: "50px", width: "70px" }} />
                        <a href="/" className='nav-link'>Trang chủ</a>
                        <a href="/movies" className='nav-link'>Lịch chiếu</a>
                        <a href="/news-list" className='nav-link'>Tin tức</a>
                        <a href="/promotions" className='nav-link'>Khuyến mãi</a>
                        <a href="/ticket-price" className='nav-link'>Giá vé</a>
                        <a href="/festivals" className='nav-link'>Liên hoan phim</a>
                        <a href="/about" className='nav-link'>Giới thiệu</a>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px" }}>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}
                                style={{ color: "#fff" }}
                            >
                                <Space>
                                    <span >Quang Duy</span>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppHeader;