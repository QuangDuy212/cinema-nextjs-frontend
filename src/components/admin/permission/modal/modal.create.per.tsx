"use client"

import { Form, Input, message, Modal, notification } from "antd";
import { useState } from "react";
import { callCreatePermission } from "src/util/api";

interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
    fetchData: () => void;
}
const ModalCreatePer = (props: IProps) => {
    //PROPS: 
    const { openModalCreate, setOpenModalCreate, fetchData } = props;

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
        name: string;
        apiPath: string;
        method: string;
        module: string;
    }) => {
        const { name, apiPath, method, module } = values;
        const per = { name, apiPath, method, module };
        setIsSubmit(true);
        const res = await callCreatePermission(per)
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới permission thành công!");
            await fetchData();
            setOpenModalCreate(false);
            form.resetFields();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    };


    return (
        <>
            <Modal
                title="Thêm mới permission"
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
                        label='Name'
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='API path'
                        name="apiPath"
                        rules={[{ required: true, message: 'Please input your apiPath!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Method'
                        name="method"
                        rules={[{ required: true, message: 'Please input your method!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Module'
                        name="module"
                        rules={[{ required: true, message: 'Please input your module!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}
export default ModalCreatePer;