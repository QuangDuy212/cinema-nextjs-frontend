'use client'
import { Col, Row } from "antd";
import FilmCard from "./film.card";
import Link from "next/link";
import { useEffect, useState } from "react";
import 'src/styles/main/content.homepage.scss'
import { callFetchAllFilms } from "src/util/api";

const ContentHomepage = () => {
    const [data, setData] = useState<IFilm[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const films = await callFetchAllFilms("?page=1&size=100");
            if (films && films?.data && films?.data?.result) {
                const filmsActive = films?.data?.result?.filter((item: IFilm) => item.active === true);
                setData(filmsActive);
            }
        }
        fetchData()
    }, [])
    return (
        <div style={{ backgroundColor: "#10151b", padding: "112px 0 40px" }}>
            <div className="container">
                <div className="content">
                    <div className="content__main">
                        <Row gutter={[20, 20]}>
                            <Col sm={24} md={24} lg={18} xl={18}>
                                <div className="title">
                                    <div className="title__start">
                                        <div className="circle"></div>
                                        <span style={{ color: "#fff ", fontSize: "20px", fontWeight: 600 }}>Phim đang chiếu</span>

                                    </div>
                                    <div className="title__end">
                                        <Link href={"/movies"}>Xem tất cả</Link>
                                    </div>
                                </div>
                                <div className="main">
                                    <Row gutter={[20, 20]}>
                                        {data?.map((item: IFilm) => {
                                            return (
                                                <Col sm={24} md={12} lg={8} xl={6} key={item.id}>
                                                    <FilmCard film={item} /></Col>
                                            )
                                        })}
                                    </Row>
                                </div>
                            </Col>
                            <Col sm={0} md={0} lg={6} xl={6}>
                                <div className="title">
                                    <div className="title__start">
                                        <span style={{ color: "#fff ", fontSize: "20px", fontWeight: 600 }}>Khuyến mại</span>

                                    </div>
                                    <div className="title__end">
                                        <Link href={"/movies"}>Xem tất cả</Link>
                                    </div>
                                </div>
                                <div className="main">
                                    <div className="promotion">
                                        <img alt="Bo ga siu dang" src="/home/1.png" />
                                    </div>
                                    <div className="promotion">
                                        <img alt="Bo ga siu dang" src="/home/1.png" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </div>
                    <div className="content__advertisement">

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContentHomepage;