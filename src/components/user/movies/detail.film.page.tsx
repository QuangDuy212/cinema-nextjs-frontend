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
    const [isClient, setIsClient] = useState<boolean>(false);

    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 1200px)")?.matches;// check mobile device
    }

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
        setIsClient(true);
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
            {isClient &&
                <div className="content">
                    <div className="movie-detail-container">
                        {!isMobile
                            ?
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
                            :
                            <div className="container">
                                <div style={{ padding: "96px 0 28px" }}>
                                    <Row gutter={[10, 10]}>
                                        <Col span={10}>
                                            <div
                                                style={{ width: "100%", height: "200px", borderRadius: "10px", overflow: "hidden" }}>
                                                <img alt="image"
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${data?.image}`}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            </div>
                                        </Col>
                                        <Col span={1}></Col>
                                        <Col span={13} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                            <div >
                                                <div
                                                    style={{ color: "#fff", fontSize: "16px", fontWeight: 600 }}>
                                                    {data?.name}
                                                </div>
                                                <div
                                                    style={{ color: "#fff", borderTop: "1px solid #ccc", fontSize: "14px" }}>
                                                    {data?.category?.name}-{data?.origin}-{data?.duration} phút
                                                </div>
                                            </div>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{ color: "#fff", marginTop: "16px", fontSize: "14px" }}>Đạo diễn: {data?.director}</div>
                                            <div style={{ color: "#fff", fontSize: "14px" }}>Diễn viên: {data?.performer}</div>
                                            <div style={{ color: "#fff", fontSize: "14px" }}> Khởi chiếu: {data?.premiere}</div>
                                            <div style={{ color: "#fff", marginTop: "16px", fontSize: "14px" }}>{data?.shortDesc}</div>
                                            <div style={{ color: "#EF4444", margin: "20px 0 16px", fontSize: "14px" }}>Kiểm duyệt: {data?.contentModeration}</div>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Button type="primary" style={{ borderRadius: "5px" }}
                                                    onClick={() => showModal()}
                                                >Chi tiết nội dung</Button>
                                                <Button type="primary" danger ghost style={{ borderRadius: "5px" }}
                                                    onClick={() => setIsOpenTrailer(true)}
                                                >Xem trailer</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        }



                    </div>
                    <div className="date">
                        {listTimes?.map((time, index) => {
                            const items = time.date.split("-");
                            return (
                                <div
                                    className={`${(activeTime == time?.id) ? "item active" : "item"}`}
                                    key={time?.id}
                                    onClick={() => { setActiveTime(time?.id); setIsShowSeat(false) }}
                                >
                                    <div>Th. {items[1]}</div>
                                    <div>{items[0]}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="show">
                        <div className="note container" style={{ textAlign: "center" }}>
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
            }
        </>
    )
}
export default DetailFilm;