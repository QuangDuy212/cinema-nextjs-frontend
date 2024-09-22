'use client'

import { Col, Row } from "antd";
import FilmMovies from "./film.movies";
import 'src/styles/movies/content.moviespage.scss';
import { use, useEffect, useState } from "react";
import { callFetchAllFilms, callFetchAllTimes } from "src/util/api";
const ContentMoviesPage = () => {
    //STATE:
    const [isClient, setIsClient] = useState<boolean>(false);
    const [listFilms, setListFilms] = useState<IFilm[]>([]);
    const [times, setTimes] = useState<ITime[]>([]);
    const [active, setActive] = useState<number>(0);

    //EFFECT:
    useEffect(() => {
        setIsClient(true);
        fetchFilms();
        fetchTimes();
    }, [])


    //METHODS:
    const fetchFilms = async () => {
        const films = await callFetchAllFilms("?page=1&size=1000");
        if (films && films?.data && films?.data?.result) {
            const filmsActive = films?.data?.result?.filter((i: IFilm) => i.active == true);
            setListFilms(filmsActive);
        }
    }

    const fetchTimes = async () => {
        const times = await callFetchAllTimes("?page=1&size=3");
        if (times && times?.data && times?.data?.result) {
            const timesActive = times?.data?.result?.filter((i: IFilm) => i.active == true);
            setTimes(timesActive);
        }
    }
    return (
        <>
            {isClient &&
                <div className="movie-container">
                    <div className="container">
                        <div className="title">
                            <div className="circle"></div>
                            <span style={{ color: "#fff ", fontSize: "20px", fontWeight: 600 }}>Phim đang chiếu</span>
                        </div>
                        <div className="button">
                            {times?.map((time: ITime, index: number) => {
                                return (
                                    <button
                                        className={`${active === time.id ? "item active" : "item"} `}
                                        key={time.id}
                                        onClick={() => {
                                            setActive(time.id)
                                        }}
                                    >{time.date}</button>

                                )
                            })}
                        </div>
                        <div className="note" style={{ textAlign: "center" }}>
                            Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
                        </div>
                        <Row gutter={[20, 20]}>
                            {listFilms?.map((item) => {
                                return (
                                    <Col sm={24} md={12} lg={12} xl={12} key={item.id}>
                                        <FilmMovies film={item} dayId={active} />
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>
            }
        </>
    )
}
export default ContentMoviesPage;