'use client'

import { Button, Col, Modal, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import 'src/styles/movies/detail.film.page.scss'
import { callFetchAllTimes, callFetchFilmById, callFetchShowsByFilmAndDay } from "src/util/api";
import { convertYoutubeToHTML } from "src/util/method";
import SeatDetailFilm from "./seat/seat.detail.film";
import { useRouter } from "next/router";


interface IProps {
    id: string;
}
const DetailFilm = (props: IProps) => {
    //PROPS: 
    const { id } = props;

    //STATE: 
    const [isOpenDes, setIsOpenDes] = useState<boolean>(false);
    const [isOpenTrailer, setIsOpenTrailer] = useState<boolean>(false);
    const [activeTime, setActiveTime] = useState<number | undefined>(0);
    const [shows, setShows] = useState<IShow[]>();
    const [isShowSeat, setIsShowSeat] = useState<boolean>(false);
    const [dataForSeat, setDataForSeat] = useState<IShow>();
    const [data, setData] = useState<IFilm>();
    const [listTimes, setListTimes] = useState<ITime[]>([]);

    const fetchShow = async () => {
        if (data) {
            const res = await callFetchShowsByFilmAndDay(data?.id ?? 0, activeTime ?? 0);
            if (res && res?.data)
                setShows(res.data);
        }
    }

    const fetchFilm = async () => {
        const film = await callFetchFilmById(id);
        if (film && film?.data) {
            setData(film?.data);
        }
    }

    const fetchTime = async () => {
        const times = await callFetchAllTimes("?page=1&size=3");
        if (times && times?.data && times?.data?.result) {
            setListTimes(times?.data?.result);
        }
    }

    useEffect(() => {
        fetchShow();
    }, [activeTime])

    useEffect(() => {
        fetchFilm();
        fetchShow();
        fetchTime();
    }, [])


    const showModal = () => {
        setIsOpenDes(true);
    };

    const handleOnClickSeatChoose = (data: IShow) => {
        setIsShowSeat(true);
        setDataForSeat(data);
    }
    return (
        <>
            <div className="content">
                <div className="movie-detail-container">
                    <div className="info">
                        <div className="info-content">
                            <Row gutter={[10, 10]}>
                                <Col span={7}>
                                    <div className="image-film">
                                        <img alt="image"
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${data?.image}`} />
                                    </div>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={16}>
                                    <div className="text-film">
                                        <div className="name">
                                            {data?.name}
                                        </div>
                                        <div className="basic-info">
                                            <span className="category">{data?.category?.name}</span>
                                            <span className="origin">{data?.origin}</span>
                                            <span className="duration">{data?.duration} phút</span>
                                            <span className="director">Đạo diễn: {data?.director}</span>
                                        </div>
                                        <div className="performer">Diễn viên: {data?.performer}</div>
                                        <div className="pre"> Khởi chiếu: {data?.premiere}</div>
                                        <div className="short-desc">{data?.shortDesc}</div>
                                        <div className="content-note">Kiểm duyệt: {data?.contentModeration}</div>
                                        <div className="info-btn">
                                            <Button type="primary" style={{ borderRadius: "5px" }}
                                                onClick={() => showModal()}
                                            >Chi tiết nội dung</Button>
                                            <Button type="primary" danger ghost style={{ borderRadius: "5px" }}
                                                onClick={() => setIsOpenTrailer(true)}
                                            >Xem trailer</Button>
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className="date">
                    {listTimes?.map((time, index) => {
                        return (
                            <div
                                className={`${(activeTime == time?.id) ? "item active" : "item"}`}
                                key={time?.id}
                                onClick={() => { setActiveTime(time?.id); setIsShowSeat(false) }}
                            >
                                {time?.date}
                            </div>
                        )
                    })}
                </div>
                <div className="show">
                    <div className="note">
                        <strong>Lưu ý</strong>: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
                    </div>
                    <div className="list-time">
                        {shows?.map((i) => {
                            return (
                                <div className="item" key={i.id}
                                    onClick={() => handleOnClickSeatChoose(i)}
                                >
                                    {i.time}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {isShowSeat &&
                    <div>
                        <SeatDetailFilm
                            data={dataForSeat}
                            dataFilm={data}
                            isShowSeat={isShowSeat}
                            setIsShowSeat={setIsShowSeat}
                        />
                    </div>
                }
                <Modal title="Chi tiết nội dung" open={isOpenDes} onCancel={() => setIsOpenDes(false)}
                    onOk={() => setIsOpenDes(false)}
                >
                    <p>{data?.shortDesc}</p>
                </Modal>

                <Modal open={isOpenTrailer} footer={[<></>]} onCancel={() => {
                    setIsOpenTrailer(false);
                }
                }
                    width={700} title="Trailer" style={{ borderRadius: 20 }}
                >
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <iframe height="377" width="670" id={`trailer-${data?.id}`}
                            src={convertYoutubeToHTML(data?.trailer)}>
                        </iframe>
                    </div>
                </Modal>
            </div>
        </>
    )
}
export default DetailFilm;