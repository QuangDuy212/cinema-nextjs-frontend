"use client"

import { Form, Input, message, Modal, notification } from "antd";
import { useState } from "react";
import { callCreateUser } from "src/util/api";

interface IProps {
    openModalNewUser: boolean;
    setOpenModalNewUser: (v: boolean) => void;
    fetchData: () => void;
}
const ModalCreateUser = (props: IProps) => {
    const { openModalNewUser, setOpenModalNewUser, fetchData } = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [form] = Form.useForm();

    const onFinish = async (values: { fullName: string, email: string, phone: string, password: string, address: string }) => {
        const { fullName, email, phone, password, address } = values;
        setIsSubmit(true);
        const res = await callCreateUser(email, fullName, phone, password, address);
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Đăng kí tài khoản thành công!");
            await fetchData();
            setOpenModalNewUser(false);
            form.resetFields();
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

    const onFinishFailed = (values: any) => {
        console.log(">>> submit error: ", values);
    }

    const showModal = () => {
        setOpenModalNewUser(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setOpenModalNewUser(false);
    };



    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={openModalNewUser}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='register-body__content'
                    form={form}
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Full name'
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your fullName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Email'
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Password'
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Phone number'
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Address'
                        name="address"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
}

export default ModalCreateUser;