'use client'

import { Button, Tabs } from "antd";
import 'src/styles/profile/app.profile.scss';
import type { TabsProps } from 'antd';
import ProfileElement from "./profile.element";
import HistoryElement from "./history.element";
import { useState } from "react";

const AppProfile = () => {
    //STATE: 
    const [active, setActive] = useState<string>("profile");
    return (
        <>
            <div className="profile">
                <div className="container">
                    <div className="profile__title">
                        Thông tin cá nhân
                    </div>

                    <div className="profile__nav">
                        <div className={`${active === "profile" ? "item-btn active" : "item-btn"}`}
                            onClick={() => setActive("profile")}
                        >Tài khoản của tôi</div>
                        <div className={`${active === "history" ? "item-btn active" : "item-btn"}`}
                            onClick={() => setActive("history")}
                        >Lịch sử mua vé</div>
                    </div>

                    <div className="profile__content">
                        {active === "profile" && <ProfileElement />}
                        {active === "history" && <HistoryElement />}

                    </div>
                </div>
            </div>
        </>
    )
}
export default AppProfile;