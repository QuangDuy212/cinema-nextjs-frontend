'use client'
import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import 'src/styles/movies/seat/seat.detail.film.scss';
import { callFetchAllSeatName } from 'src/util/api';
const SeatDetailFilm = () => {
    const [seatName, setSeatName] = useState<ISeat[]>([]);

    useEffect(() => {
        const fetchSeatName = async () => {
            const seats = await callFetchAllSeatName(1, 100);
            if (seats && seats?.data && seats?.data?.result)
                setSeatName(seats.data.result);
        }
        fetchSeatName();
    }, [])
    return (
        <>
            <div className='seat-container'>
                <div className="seat-detail-film">
                    <div className="show-seat">Giờ chiếu: <span className='time-seat'>11:00</span></div>
                    <div className="title">Phòng chiếu số 4</div>
                    <div className="list-seat">
                        {seatName?.map((i) => {
                            return (
                                <div className="item" key={i.id}>{i.name}</div>
                            )
                        }
                        )}
                    </div>
                    <div className='note-seat'>
                        <div className='note-seat__item'>
                            <div className='note-seat__item--buyed'>X</div>
                            <div className='note-seat__item--text'>Đã đặt</div>
                        </div>
                        <div className='note-seat__item'>
                            <div className='note-seat__item--choosed'></div>
                            <div className='note-seat__item--text'>Ghế bạn chọn</div>
                        </div>
                    </div>
                    <div className='list-seat-info'>
                        <Row style={{ width: "100%" }}>
                            <Col sm={24} md={24} xl={12} xxl={12}>
                                <div className='list-seat-info__choosed'>
                                    <div className='list-seat-info__choosed--quantity'>Số lượng: <span>1</span></div>
                                    <div className='list-seat-info__choosed--total'>Tổng tiền: <span>50.000đ</span></div>
                                </div>
                            </Col>
                            <Col sm={24} md={24} xl={12} xxl={12}>
                                <div className='list-seat-info__btn'>
                                    <div className='return-btn-seat'>Quay lại</div>
                                    <button className='buy-btn-seat'>Thanh toán</button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SeatDetailFilm;