
'use client'
import React from 'react';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import 'src/styles/footer/app.footer.scss';
import Link from 'next/link';

const AppFooter = () => {
    return (
        <>
            <div className='footer'>
                <div className='footer__nav'>
                    <Link href={"/"}>Chính sách</Link>
                    <Link href={"/"}>Lịch chiếu</Link>
                    <Link href={"/"}>Tin tức</Link>
                    <Link href={"/"}>Giá vé</Link>
                    <Link href={"/"}>Hỏi đáp</Link>
                    <Link href={"/"}>Liên hệ</Link>
                </div>
                <div className='footer__icon'>
                    <div className='facebook'><FacebookOutlined /></div>
                    <div className='youtube'><YoutubeOutlined /></div>
                    <div className='instagram'><InstagramOutlined /></div>
                    <div className='googleplay'><img src='home/googleplay.png' /></div>
                    <div className='appstore'><img src='home/appstore.png' /></div>
                    <div className='certification'><img src='home/certification.png' /></div>

                </div>
                <div className='footer__text'>
                    Copyright 2023. NCC All Rights Reservered. Dev by
                    <Link href={"/https://www.facebook.com/profile.php?id=100079731466553"}>Quang Duy</Link>
                </div>
            </div>
        </>
    )
}

export default AppFooter;