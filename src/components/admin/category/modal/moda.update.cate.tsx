"use client"

import { Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { callUpdateCategory } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: ICategory | undefined;
}
const ModalUpdateCate = (props: IProps) => {
    //PROPS: 
    const { openModalUpdate, setOpenModalUpdate, fetchData, data } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [form] = Form.useForm();

    //METHODS: 
    useEffect(() => {
        if (data)
            form.setFieldsValue(data)
    }, [data])

    const onFinish = async (values: {
        id: number;
        name: string;
    }) => {
        const { id, name } = values;
        const res = await callUpdateCategory(id, name);
        if (res && res?.data) {
            notification.success({
                message: "Cập nhật Category thành công!",
                duration: 1
            });
            await fetchData();
            setOpenModalUpdate(false);
        } else {
            notification.error({
                message: "Cập nhật Category có lỗi xảy ra!",
                duration: 1
            });
        }
    }

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
                        label='Name'
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default ModalUpdateCate;