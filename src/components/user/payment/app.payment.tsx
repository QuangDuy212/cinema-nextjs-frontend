"use client"

import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { resolve } from "node:path/win32";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { setEmptyBill } from "src/redux/slice/billSlide";
import 'src/styles/payment/app.payment.scss';
import { callCreateBill, callCreateHistory, callCreateSeat, callFetchShowById } from "src/util/api";
import { redirect } from 'next/navigation';

const AppPayment = () => {
    //lib: 
    const bill = useAppSelector(state => state.bill);
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    const dispatch = useAppDispatch();
    const router = useRouter();

    //STATE:
    const [show, setShow] = useState<IShow>();

    useEffect(() => {
        if (!isAuthenticated) redirect("/auth/signin")
        fetchShow();
    }, [])

    const fetchShow = async () => {
        const showTime = await callFetchShowById(bill.showId);
        if (showTime && showTime?.data) {
            setShow(showTime.data);
        }
    }

    const handleConfirm = async () => {
        if (isAuthenticated) {
            const seats = bill.seats;
            const billReq: IBill = {
                total: bill.total,
                quantity: bill.quantity,
                status: "PENDING"
            }
            const resBill = await callCreateBill(billReq);
            if (resBill && resBill?.data) {
                seats.forEach(async i => {
                    const res = await callCreateSeat(i, bill.showId, resBill.data.id);
                })
                var reqSeats = "";
                seats.forEach((i, index) => {
                    if (index != seats.length - 1) {
                        reqSeats += (i + ",");
                    }
                    else {
                        reqSeats += i;
                    }
                })
                const reqHis = {
                    "total": bill.total,
                    "quantity": bill.quantity,
                    "zoomNumber": bill.zoomNumber,
                    "time": show?.time ?? "",
                    "date": bill.time,
                    "seats": reqSeats,
                    "nameFilm": bill.nameFilm
                }
                const history = await callCreateHistory(reqHis);

            }
            dispatch(setEmptyBill());
            router.push("/thank")

        } else {
            router.push("/auth/signin");
        }
    }

    const handleReturn = () => {
        dispatch(setEmptyBill());
        router.push("/movies")

    }
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
                                    <div>{bill?.nameFilm ?? 0}</div>
                                </div>
                                <div className="payment__info--show">
                                    <div style={{ width: "50%" }}>
                                        <div>Ngày giờ chiếu</div>
                                        <div style={{ fontWeight: "700" }}>
                                            <span style={{ color: "#F97316" }}>{bill?.show ?? 0}</span> - {bill?.time ?? 0}
                                        </div>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div>Ghế</div>
                                        <div style={{ fontWeight: "700" }}>
                                            {bill?.seats?.map((i, index) => {
                                                if (index !== bill?.seats?.length - 1)
                                                    return (
                                                        <span key={i}>{i},</span>
                                                    );
                                                else {
                                                    return (
                                                        <span key={i}>{i}</span>
                                                    )

                                                }

                                            }) ?? []}

                                        </div>
                                    </div>
                                </div>
                                <div className="payment__info--zoom">
                                    <div style={{ width: "50%" }}>
                                        <div>Định dạng</div>
                                        <div style={{ fontWeight: "700" }}>2D</div>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div>Phòng chiếu</div>
                                        <div style={{ fontWeight: "700" }}>{bill?.zoomNumber ?? 0}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="payment__bonus">
                                <div className="payment__bonus--title">Thông tin thanh toán</div>
                                <div className="payment__bonus--table">
                                    {
                                        bill?.seats?.length > 0 &&
                                        <table>
                                            <tr>
                                                <th>Danh mục</th>
                                                <th>Số lượng</th>
                                                <th>Tổng tiền</th>
                                            </tr>
                                            <tr>
                                                <td>Ghế ({bill?.seats?.map((i, index) => {
                                                    if (index !== bill?.seats?.length - 1)
                                                        return (
                                                            <span key={i}>{i},</span>
                                                        );
                                                    else {
                                                        return (
                                                            <span key={i}>{i}</span>
                                                        )

                                                    }

                                                }) ?? []})</td>
                                                <td>{bill?.quantity ?? 0}</td>
                                                <td>{bill?.total ?? 0}</td>
                                            </tr>
                                        </table>
                                    }
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
                                            <div>{bill?.total ?? 0}đ</div>
                                        </div>
                                        <div className="pay-content">
                                            <div>Phí</div>
                                            <div>0đ</div>
                                        </div>
                                        <div className="pay-content">
                                            <div>Tổng cộng</div>
                                            <div>{bill?.total ?? 0}đ</div>
                                        </div>
                                    </div>
                                    <div className="buy__expense--btn">
                                        <div className="pay-btn__confirm"
                                            onClick={() => handleConfirm()}
                                        >Thanh toán</div>
                                        <div className="pay-btn__return"
                                            onClick={() => handleReturn()}
                                        >Quay lại</div>
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