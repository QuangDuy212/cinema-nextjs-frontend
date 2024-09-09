'use client'
import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import 'src/styles/movies/seat/seat.detail.film.scss';
import { callFetchAllSeatName, callFetchSeatByShow } from 'src/util/api';

interface IProps {
    data: IShow | undefined;
    isShowSeat: boolean;
    setIsShowSeat: (v: boolean) => void;
}
const SeatDetailFilm = (props: IProps) => {
    const { data, isShowSeat, setIsShowSeat } = props;
    const [seatName, setSeatName] = useState<ISeat[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [activeTempSeat, setActiveTempSeat] = useState<number[]>([]);
    const [seatBuyed, setSeatBuyed] = useState<string[]>([]);

    useEffect(() => {
        const fetchSeatName = async () => {
            const seats = await callFetchAllSeatName(1, 100);
            if (seats && seats?.data && seats?.data?.result)
                setSeatName(seats.data.result);
        }

        const fetchSeatBuyed = async () => {
            const res = await callFetchSeatByShow(data?.id, 1, 100);
            if (res && res?.data && res?.data?.result) {
                const arraySeatBuyed = res.data.result.map((i: ISeat) => i.name);
                setSeatBuyed(arraySeatBuyed);
            }
        }
        fetchSeatName();
        fetchSeatBuyed();
    }, [])
    return (
        <>
            <div className='seat-container'>
                <div className="seat-detail-film">
                    <div className="show-seat">Giờ chiếu: <span className='time-seat'>{data?.time}</span></div>
                    <div className="title">Phòng chiếu số {data?.zoomNumber}</div>
                    <div className="list-seat">
                        {seatName?.map((i) => {
                            return (
                                <>
                                    {
                                        activeTempSeat.includes(i.id)
                                            ?
                                            <div className='seat-choosed' key={`${i.id}-choosed`}
                                                onClick={() =>
                                                    setActiveTempSeat(item => item.filter(v => v != i.id))}
                                            >
                                            </div>
                                            :
                                            <div
                                                className={`${seatBuyed.includes(i.name) ? "seat-buyed" : "item"}`}
                                                key={i.id}
                                                onClick={() => {
                                                    if (!seatBuyed.includes(i.name))
                                                        setActiveTempSeat(item => [...item, i.id])
                                                }}
                                            >{seatBuyed.includes(i.name) ? "X" : i.name}</div>
                                    }


                                </>
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
                                    <div className='list-seat-info__choosed--quantity'>Số lượng: <span>{quantity}</span></div>
                                    <div className='list-seat-info__choosed--total'>Tổng tiền: <span>50.000đ</span></div>
                                </div>
                            </Col>
                            <Col sm={24} md={24} xl={12} xxl={12}>
                                <div className='list-seat-info__btn'>
                                    <div className='return-btn-seat'
                                        onClick={() => setIsShowSeat(false)}
                                    >Quay lại</div>
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