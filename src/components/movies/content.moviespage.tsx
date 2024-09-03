'use client'

import { Col, Row } from "antd";
import FilmMovies from "./film.movies";
import 'src/styles/movies/content.moviespage.scss';
import { callFetchAllFilms } from "src/util/api";
import { use, useEffect } from "react";
interface IProps {
    films: IFilm[];
    times: ITime[];
}
const ContentMoviesPage = (props: IProps) => {
    const { films, times } = props;
    useEffect(() => {
        console.log(">>> check films", films)
    }, [])
    return (
        <>
            <div className="movie-container">
                <div className="container">
                    <div className="title">
                        <div className="circle"></div>
                        <span style={{ color: "#fff ", fontSize: "20px", fontWeight: 600 }}>Phim đang chiếu</span>
                    </div>
                    <div className="button">
                        {times?.map((time: ITime) => {
                            return (
                                <button className="item" key={time.id}>{time.date}</button>

                            )
                        })}
                    </div>
                    <div className="note">
                        <strong>Lưu ý</strong>: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
                    </div>
                    <Row gutter={[20, 20]}>
                        {films?.map((item) => {
                            return (
                                <Col sm={24} md={12} lg={12} xl={12} key={item.id}>
                                    <FilmMovies film={item} />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </>
    )
}
export default ContentMoviesPage;