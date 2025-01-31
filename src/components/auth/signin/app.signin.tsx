"use client"
import { Button, Divider, Form, Input, message, notification } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from 'src/styles/auth/auth.module.scss';
import "antd/dist/antd.css";
import { callLogin, callRefreshToken } from 'src/util/api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hook';
import { useRouter } from 'next/navigation';
import { setUserLoginInfo } from 'src/redux/slice/accountSlide';
import ModalForgotPassword from './modal.forgot.password';
const AppSignin = () => {
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    //LIB: 
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [])

    const onFinish = async (values: any) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password);
        setIsSubmit(false);
        // const token = await callRefreshToken();
        if (res.data != null) {
            localStorage.removeItem('access_token')
            localStorage.setItem('access_token', res?.data?.access_token);
            dispatch(setUserLoginInfo(res?.data?.user))
            message.success('Đăng nhập tài khoản thành công!');
            router.push('/');
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Tài khoản/ mật khẩu không đúng",
                duration: 5
            })
        }
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

                                    <div
                                        style={{ width: "100%", textAlign: "right", cursor: "pointer", color: "#5495ff" }}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Quên mật khẩu?

                                    </div>

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
                                            <Link href='/auth/register' > Đăng Ký </Link>
                                        </span>
                                    </p>
                                </Form>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
            <ModalForgotPassword
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}
export default AppSignin;