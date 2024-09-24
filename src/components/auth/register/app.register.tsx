
'use client'
import { Button, Divider, Form, Input, Row, Select, message, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from 'src/styles/auth/auth.module.scss';
const { Option } = Select;
import "antd/dist/antd.css";
import { callRegister } from 'src/util/api';

interface IValue {
    fullName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

const AppRegister = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const router = useRouter();

    const onFinish = async (values: any) => {
        const { fullName, email, password, address, phone } = values;
        setIsSubmit(true);
        const data = { fullName, email, password, phone, address };
        const res = await callRegister(data);
        console.log(">>> check res: ", res);
        setIsSubmit(false);
        if (res?.data?.id) {
            message.success('Đăng ký tài khoản thành công!');
            router.push('/auth/signin')
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    //@ts-ignore
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    };


    return (
        <div className={styles["register-page"]} >

            <main className={styles.main} >
                <div className={styles.container} >
                    <section className={styles.wrapper} >
                        <div className={styles.heading} >
                            <h2 className={`${styles.text} ${styles["text-large"]}`}> Đăng Ký Tài Khoản </h2>
                            < Divider />
                        </div>
                        < Form<IUser>
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Họ tên"
                                name="fullName"
                                rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                            >
                                <Input style={{ borderRadius: "5px" }} />
                            </Form.Item>


                            <Form.Item
                                labelCol={{ span: 24 }
                                } //whole column
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input type='email' style={{ borderRadius: "5px" }} />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password style={{ borderRadius: "5px" }} />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                            >
                                <Input type='number' style={{ borderRadius: "5px" }} />
                            </Form.Item>


                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
                            >
                                <Input style={{ borderRadius: "5px" }} />
                            </Form.Item>

                            < Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit}
                                    style={{ borderRadius: "5px" }}>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                            <Divider> Or </Divider>
                            <p className="text text-normal" > Đã có tài khoản ?
                                <span>
                                    <Link href='/auth/signin' > Đăng Nhập </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default AppRegister;