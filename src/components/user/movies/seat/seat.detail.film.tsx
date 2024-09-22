'use client'
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux/hook';
import { setBill } from 'src/redux/slice/billSlide';
import 'src/styles/movies/seat/seat.detail.film.scss';
import { callFetchAllSeatName, callFetchSeatByShow } from 'src/util/api';

interface IProps {
    dataFilm: IFilm | undefined;
    data: IShow | undefined;
    isShowSeat: boolean;
    setIsShowSeat: (v: boolean) => void;
}

interface IPayload {
    nameFilm: string | undefined;
    show: string | undefined;
    time: string | undefined;
    seats: string[] | undefined;
    zoomNumber: number | undefined;
    quantity: number | undefined;
    total: number | undefined;
    showId: number | undefined;
}
const SeatDetailFilm = (props: IProps) => {
    //PROPS:
    const { dataFilm, data, isShowSeat, setIsShowSeat } = props;

    // STATE: 
    const [seatName, setSeatName] = useState<ISeat[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [activeTempSeatId, setActiveTempSeatId] = useState<number[]>([]);
    const [seatChoosed, setSeatChoosed] = useState<string[]>([]);
    const [seatBuyed, setSeatBuyed] = useState<string[]>([]);
    const [dataBill, setDataBill] = useState<IPayload>();

    // LIB: 
    const dispatch = useAppDispatch();
    const router = useRouter();


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


    const handleOnClickBuy = () => {
        const payload = {
            nameFilm: dataFilm?.name,
            show: data?.time,
            time: data?.day?.date,
            seats: seatChoosed,
            zoomNumber: data?.zoomNumber,
            quantity: quantity,
            total: quantity * (data?.price ?? 0),
            showId: data?.id
        }
        setDataBill(payload);
        dispatch(setBill(payload));
        router.push("/payment");
    }
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
                                        activeTempSeatId.includes(i.id)
                                            ?
                                            <div className='seat-choosed' key={`${i.id}-choosed`}
                                                onClick={() => {
                                                    if (!seatBuyed.includes(i.name)) {
                                                        setQuantity(i => i - 1);
                                                        setActiveTempSeatId(item => item.filter(v => v != i.id))
                                                        setSeatChoosed(item => item.filter(v => v != i.name))
                                                    }
                                                }
                                                }
                                            >
                                            </div>
                                            :
                                            <div
                                                className={`${seatBuyed.includes(i.name) ? "seat-buyed" : "item"}`}
                                                key={i.id}
                                                onClick={() => {
                                                    if (!seatBuyed.includes(i.name)) {
                                                        setQuantity(i => i + 1);
                                                        setActiveTempSeatId(item => [...item, i.id])
                                                        setSeatChoosed(item => [...item, i.name])
                                                    }
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
                    <div className='list-seat-info container'>
                        <Row style={{ width: "100%" }}>
                            <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
                                <div className='list-seat-info__choosed' style={{ marginTop: "20px" }}>
                                    <div className='list-seat-info__choosed--quantity'>Số lượng: <span>{quantity}</span></div>
                                    <div className='list-seat-info__choosed--total'>Tổng tiền: <span>{quantity * (data?.price ?? 0)}</span></div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
                                <div className='list-seat-info__btn' style={{ marginTop: "20px" }}>
                                    <div className='return-btn-seat'
                                        onClick={() => setIsShowSeat(false)}
                                    >Quay lại</div>
                                    <button className='buy-btn-seat'
                                        onClick={() => handleOnClickBuy()}
                                    >Thanh toán</button>
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