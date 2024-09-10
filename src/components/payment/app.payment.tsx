"use client"

import { Col, Row } from "antd";
import 'src/styles/payment/app.payment.scss';

const AppPayment = () => {
    return (
        <>
            <div className="payment-container">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col md={24} xl={16}>
                            <div className="payment__info">
                                <div className="payment__info--title">Thông tin phim</div>
                                <div className="payment__info--film">
                                    <div>Phim</div>
                                    <div>LÀM GIÀU VỚI MA-T16</div>
                                </div>
                                <div className="payment__info--show">
                                    <div style={{ width: "50%" }}>
                                        <div>Ngày giờ chiếu</div>
                                        <div style={{ fontWeight: "700" }}>
                                            <span style={{ color: "#F97316" }}>9:00</span> - 10/09/2024
                                        </div>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div>Ghế</div>
                                        <div style={{ fontWeight: "700" }}>K17,K16,K15</div>
                                    </div>
                                </div>
                                <div className="payment__info--zoom">
                                    <div style={{ width: "50%" }}>
                                        <div>Định dạng</div>
                                        <div style={{ fontWeight: "700" }}>2D</div>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div>Phòng chiếu</div>
                                        <div style={{ fontWeight: "700" }}>5</div>
                                    </div>
                                </div>
                            </div>

                            <div className="payment__bonus">
                                <div className="payment__bonus--title">Thông tin thanh toán</div>
                                <div className="payment__bonus--table">
                                    <table>
                                        <tr>
                                            <th>Danh mục</th>
                                            <th>Số lượng</th>
                                            <th>Tổng tiền</th>
                                        </tr>
                                        <tr>
                                            <td>Ghế (K17,K16,K15)</td>
                                            <td>3</td>
                                            <td>150.000đ</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </Col>
                        <Col md={24} xl={8}>
                            <div className="buy">
                                <div className="buy__method"></div>
                                <div className="buy__expense">
                                    <div className="buy__expense--title">Chi phí</div>
                                    <div className="buy__expense--content">
                                        <div className="pay-content">
                                            <div >Thanh toán</div>
                                            <div>50.000đ</div>
                                        </div>
                                        <div className="pay-content">
                                            <div>Phí</div>
                                            <div>0đ</div>
                                        </div>
                                        <div className="pay-content">
                                            <div>Tổng cộng</div>
                                            <div>50.000đ</div>
                                        </div>
                                    </div>
                                    <div className="buy__expense--btn">
                                        <div className="pay-btn__confirm">Thanh toán</div>
                                        <div className="pay-btn__return">Quay lại</div>
                                    </div>
                                </div>
                                <div className="buy__note">
                                    <span style={{ fontWeight: 700 }}>Lưu ý</span>: Không mua vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim
                                    kết thúc sau 22h00 và không mua vé cho trẻ em
                                    dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default AppPayment;