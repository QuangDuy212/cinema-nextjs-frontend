"use client"

import { Form, Input, message, Modal, notification, Select, SelectProps } from "antd";
import { useState } from "react";
import { callCreateTime } from "src/util/api";

interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
    fetchData: () => void;
}
const ModalCreateDate = (props: IProps) => {
    //PROPS: 
    const { openModalCreate, setOpenModalCreate, fetchData } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    //LIBRARY: 
    const [form] = Form.useForm();




    const handleChange = (value: string) => {
    };


    //METHODS: 
    const onFinishFailed = (values: any) => {
    }

    const showModal = () => {
        setOpenModalCreate(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setOpenModalCreate(false);
    };

    const onFinish = async (values: {
        "date": string;
    }) => {
        const { date } = values;
        setIsSubmit(true);
        const res = await callCreateTime({ date })
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới Time thành công!");
            await fetchData();
            setOpenModalCreate(false);
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
                title="Thêm mới Time"
                open={openModalCreate}
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
                        label='Date'
                        name="date"
                        rules={[{ required: true, message: 'Please input your date!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}
export default ModalCreateDate;