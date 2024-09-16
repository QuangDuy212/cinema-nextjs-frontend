"use client"

import { Form, Input, message, Modal, notification, Select, SelectProps } from "antd";
import { useState } from "react";
import { callCreateShow } from "src/util/api";

interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
    fetchData: () => void;
    daysOptions: SelectProps['options'];
    filmsOptions: SelectProps['options'];
}
const ModalCreateShow = (props: IProps) => {
    //PROPS: 
    const { openModalCreate, setOpenModalCreate, fetchData, daysOptions, filmsOptions } = props;

    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    //LIBRARY: 
    const [form] = Form.useForm();


    //METHODS: 
    const onFinishFailed = (values: any) => {
        console.log(">>> submit error: ", values);
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
        "zoomNumber": number;
        "time": string;
        "active": boolean;
        "price": number;
        "day": number;
        "film": number
    }) => {
        const { zoomNumber, time, active, price, day, film } = values;
        const show = { zoomNumber, time, active, price, day: { id: day }, film: { id: film } };
        setIsSubmit(true);
        const res = await callCreateShow(show)
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới Show thành công!");
            await fetchData();
            setOpenModalCreate(false);
            form.resetFields();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    //@ts-ignore
                    res?.message && Array.isArray(res?.message) ? res?.message[0] : res?.message,
                duration: 5
            })
        }
    };


    return (
        <>
            <Modal
                title="Thêm mới Show"
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
                        label='Zoom number'
                        name="zoomNumber"
                        rules={[{ required: true, message: 'Please input your zoomNumber!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Time'
                        name="time"
                        rules={[{ required: true, message: 'Please input your time!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Price'
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Active'
                        name="active"
                        rules={[{ required: true, message: 'Please input your active!' }]}
                    >
                        <Select
                            options={[
                                { value: true, label: "True" },
                                { value: false, label: "False" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Day'
                        name="day"
                        rules={[{ required: true, message: 'Please input your date!' }]}
                    >
                        <Select
                            options={daysOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Film'
                        name="film"
                        rules={[{ required: true, message: 'Please input your film!' }]}
                    >
                        <Select
                            options={filmsOptions}
                        />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}
export default ModalCreateShow;