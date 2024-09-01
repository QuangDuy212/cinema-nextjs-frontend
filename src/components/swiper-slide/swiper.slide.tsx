'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import 'src/styles/swiper-slide/swiper.slide.scss'


// import required modules
import { Navigation } from 'swiper/modules';
import Image from 'next/image';

const SwiperComponent = () => {
    return (
        <>
            <div style={{ height: "100vh" }}>
                <Swiper
                    autoplay={true}
                    rewind={true}
                    navigation={true}
                    modules={[Navigation]} className="mySwiper">
                    <SwiperSlide>
                        <img src='/home/1.png' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='/home/2.png' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='/home/4.png' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='/home/5.png' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='/home/6.png' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src='/home/9.png' />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}

export default SwiperComponent;
