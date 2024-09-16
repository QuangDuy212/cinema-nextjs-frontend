"use client"

import { Form, Input, message, Modal, notification, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { callUpdateShow } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: IShow | undefined;
    daysOptions: SelectProps['options'];
    filmsOptions: SelectProps['options'];
}
const ModalUpdateShow = (props: IProps) => {
    //PROPS: 
    const { openModalUpdate, setOpenModalUpdate, fetchData, data, daysOptions, filmsOptions } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    //LIB: 
    const [form] = Form.useForm();


    //METHODS: 
    useEffect(() => {
        if (data) {
            const dayId = data?.day?.id;
            const filmId = data?.film?.id
            const updateData = { ...data, day: dayId, film: filmId };
            form.setFieldsValue(updateData)
            console.log(">>> check updateData: ", updateData);
        }
    }, [data])

    const onFinish = async (values: {
        "id": number;
        "zoomNumber": number;
        "time": string;
        "active": boolean;
        "price": number;
        "day": number;
        "film": number
    }) => {
        const { id, zoomNumber, time, active, day, film, price } = values;
        const show = { id, zoomNumber, time, active, day: { id: day }, film: { id: film }, price };
        setIsSubmit(true);
        const res = await callUpdateShow(show)
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới Show thành công!");
            await fetchData();
            setOpenModalUpdate(false);
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


    const onFinishFailed = (error: any) => {
        console.log(">>> check error: ", error)
    }

    const showModal = () => {
        setOpenModalUpdate(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setOpenModalUpdate(false);
    };



    return (
        <>
            <Modal
                title="Basic Modal"
                open={openModalUpdate}
                onOk={handleOk}
                onCancel={handleCancel}
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
                        hidden
                        label='ID'
                        name="id"
                        rules={[{ required: true, message: 'Please input your id!' }]}
                    >
                        <Input />
                    </Form.Item>
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
            </Modal>
        </>
    );

}
export default ModalUpdateShow;