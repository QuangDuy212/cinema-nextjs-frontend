'use client'
import { Col, Row } from "antd";
import FilmCard from "./film.card";
import 'src/styles/main/content.homepage.scss'

const ContentHomepage = () => {
    return (
        <div style={{ backgroundColor: "#10151b", padding: "40px 0" }}>

            <div className="container">
                <div className="content">
                    <div className="content__main">
                        <div className="title">
                            <div className="circle"></div>
                            <span style={{ color: "#fff ", fontSize: "20px", fontWeight: 600 }}>Phim đang chiếu</span>
                        </div>
                        <div className="main">
                            <Row gutter={[20, 20]}>
                                <Col sm={24} md={12} lg={8} xl={4}>
                                    <FilmCard /></Col>
                                <Col sm={24} md={12} lg={8} xl={4}>
                                    <FilmCard /></Col>
                                <Col sm={24} md={12} lg={8} xl={4}>
                                    <FilmCard /></Col>
                                <Col sm={24} md={12} lg={8} xl={4}>
                                    <FilmCard /></Col>
                                <Col sm={24} md={12} lg={8} xl={4}>
                                    <FilmCard /></Col>
                                <Col sm={24} md={12} lg={8} xl={4}>
                                    <FilmCard /></Col>
                            </Row>
                        </div>
                    </div>
                    <div className="content__advertisement">

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContentHomepage;