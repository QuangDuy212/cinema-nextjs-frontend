"use client"

import { Form, Input, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { callUpdateTime } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: ITime | undefined;
}
const ModalUpdateDate = (props: IProps) => {
    //PROPS: 
    const { openModalUpdate, setOpenModalUpdate, fetchData, data } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    //LIB: 
    const [form] = Form.useForm();


    //METHODS: 
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data)
        }
    }, [data])

    const onFinish = async (values: {
        "id": number;
        "date": string;
        "active": boolean;
    }) => {
        const { id, date, active } = values;
        const time = { id, date, active };
        setIsSubmit(true);
        const res = await callUpdateTime(time)
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Chỉnh sửa Time thành công!");
            await fetchData();
            setOpenModalUpdate(false);
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
                        label='Date'
                        name="date"
                        rules={[{ required: true, message: 'Please input your date!' }]}
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
                </Form>
            </Modal>
        </>
    );
}
export default ModalUpdateDate;