"use client"

import { Form, Input, message, Modal, notification } from "antd";
import { useState } from "react";
import { callChangePassword } from "src/util/api";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
}
const ModalChangePassword = (props: IProps) => {
    //PROPS: 
    const { openModal, setOpenModal } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    //LIBRARY: 
    const [form] = Form.useForm();




    //METHODS: 
    const handleChange = (value: string) => {
    };


    const onFinishFailed = (values: any) => {
    }

    const showModal = () => {
        setOpenModal(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const onFinish = async (values: { currentPassword: string, newPassword: string }) => {
        const { currentPassword, newPassword } = values;
        const data = { currentPassword, newPassword }
        setIsSubmit(true);
        const res = await callChangePassword(data)
        setIsSubmit(false);
        //@ts-ignore
        if (res && res?.statusCode === 200) {
            message.success("Cập nhật mật khẩu thành công!");
            setOpenModal(false);
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

    return (
        <>
            <Modal
                title="Thay đổi mật khẩu"
                open={openModal}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                okText={"Chỉnh sửa"}
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
                        label='Mật khẩu hiện tại'
                        name="currentPassword"
                        rules={[{ required: true, message: 'Please input your currentPassword!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Mật khẩu mới'
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your newPassword!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )

}
export default ModalChangePassword;