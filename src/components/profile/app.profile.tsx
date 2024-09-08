'use client'

import { Button, Tabs } from "antd";
import 'src/styles/profile/app.profile.scss';
import type { TabsProps } from 'antd';
import ProfileElement from "./profile.element";

const AppProfile = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span style={{ fontSize: "16px", fontWeight: 500 }}>Tài khoản của tôi</span>,
            children: <ProfileElement />,
        },
        {
            key: '2',
            label: <span style={{ fontSize: "16px", fontWeight: 500 }}>Lịch sử mua vé</span>,
            children: 'Content of Tab Pane 2',
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <>
            <div className="profile">
                <div className="container">
                    <div className="profile__title">
                        Thông tin cá nhân
                    </div>

                    <div className="profile__nav">
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange}
                            style={{
                                color: "#fff",
                                width: "100%",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AppProfile;