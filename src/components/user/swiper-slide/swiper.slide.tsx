'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'src/styles/swiper-slide/swiper.slide.scss'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const SwiperComponent = () => {
    return (
        <>
            <div style={{ paddingTop: "80px" }}>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
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
