'use client'

import { Button, Form, Input, Modal, notification, Steps } from "antd";
import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { callChangeForgotPassword, callRetryPassword } from "src/util/api";

interface IProps {
    isModalOpen: boolean;
    setIsModalOpen: (v: boolean) => void;
}

const ModalForgotPassword = (props: IProps) => {
    //PROPS:
    const { isModalOpen, setIsModalOpen } = props;

    //STATE:
    const [current, setCurrent] = useState<number>(0);
    const [userId, setUserId] = useState<string>("");
    const [emailUser, setEmailUser] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    //LIB:
    const [form] = Form.useForm();
    const [formVer] = Form.useForm();

    //METHODS:
    const onFinishStep0 = async (values: any) => {
        const { email } = values;
        setEmailUser(email);
        const data = { email };
        setIsSending(true);
        const res = await callRetryPassword(data);
        setIsSending(false);
        if (res?.data) {
            setUserId(res?.data?.id)
            setCurrent(1);
            notification.success({ message: "Gửi thành công email" })
        } else {
            setIsSending(false);
            notification.error({
                message: "Error",
                //@ts-ignore
                description: res?.message
            })
        }

    }

    const onFinishStep1 = async (values: { code: string, newPassword: string, confirmPassword: string }) => {
        const { code, newPassword, confirmPassword } = values;
        const data = { code, newPassword, confirmPassword, email: emailUser };
        setIsSubmit(true);
        const res = await callChangeForgotPassword(data);
        setIsSubmit(false);
        //@ts-ignore
        if (res && res?.statusCode == 200) {
            setCurrent(2);
        } else {
            notification.error({
                message: "Error",
                //@ts-ignore
                description: res?.message
            })
        }

    }

    const handleClose = () => {
        setIsModalOpen(false);
        form.resetFields();
        formVer.resetFields();
        setCurrent(0);
    }
    return (
        <>
            <Modal
                title="Quên mật khẩu"
                open={isModalOpen}
                onOk={() => handleClose()}
                onCancel={() => handleClose()}
                maskClosable={false}
                footer={null}
            >
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Email',
                            // status: 'finish',
                            icon: <UserOutlined />,
                        },
                        {
                            title: 'Verification',
                            // status: 'finish',
                            icon: <SolutionOutlined />,
                        },

                        {
                            title: 'Done',
                            // status: 'wait',
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                {current === 0 &&
                    <>

                        <div style={{ margin: "20px 0" }}>
                            <p>Để thực hiện thay đổi mật khẩu, vui lòng nhập email tài khoản của bạn.</p>
                        </div>
                        <Form
                            name="change-password"
                            onFinish={onFinishStep0}
                            autoComplete="off"
                            layout='vertical'
                            form={form}
                        >
                            <Form.Item
                                label=""
                                name="email"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit" loading={isSending}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                }

                {current === 1 &&
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Vui lòng thực hiện đổi mật khẩu</p>
                        </div>

                        <Form
                            name="change-pass-2"
                            onFinish={onFinishStep1}
                            autoComplete="off"
                            layout='vertical'
                            form={formVer}

                        >
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your code!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu mới"
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Xác nhận mật khẩu"
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                }

                {current === 2 &&
                    <div style={{ margin: "20px 0" }}>
                        <p>Tải khoản của bạn đã được thay đổi mật khẩu thành công. Vui lòng đăng nhập lại</p>
                    </div>
                }
            </Modal>
        </>
    )
}

export default ModalForgotPassword;