"use client"
import { Button, Divider, Form, Input, message, notification } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import styles from 'src/styles/auth/auth.module.scss';
import "antd/dist/antd.css";
const AppSignin = () => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const onFinish = () => {
        console.log(">>>  finish")
    }
    return (
        <>
            <div>
                <div className={styles["login-page"]}>
                    <main className={styles.main}>
                        <div className={styles.container}>
                            <section className={styles.wrapper}>
                                <div className={styles.heading}>
                                    <h2 className={`${styles.text} ${styles["text-large"]}`}>Đăng Nhập</h2>
                                    <Divider />

                                </div>
                                <Form
                                    name="basic"
                                    // style={{ maxWidth: 600, margin: '0 auto' }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        labelCol={{ span: 24 }} //whole column
                                        label="Email"
                                        name="username"
                                        rules={[{ required: true, message: 'Email không được để trống!' }]}
                                    >
                                        <Input style={{ borderRadius: "5px" }} />
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
                                    // wrapperCol={{ offset: 6, span: 16 }}
                                    >
                                        <Button type="primary" htmlType="submit"
                                            loading={isSubmit}
                                            style={{ borderRadius: "8px" }}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                    <Divider>Or</Divider>
                                    <p className="text text-normal">Chưa có tài khoản ?
                                        <span>
                                            <Link href='/register' > Đăng Ký </Link>
                                        </span>
                                    </p>
                                </Form>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AppSignin;