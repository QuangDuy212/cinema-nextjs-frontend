"use client"

import { Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { callUpdatePermission } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: IPermission | undefined;
}
const ModalUpdatePer = (props: IProps) => {
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
        apiPath: string;
        method: string;
        module: string;
    }) => {
        const { id, name, apiPath, method, module } = values;
        const per = { name, apiPath, method, module };
        const res = await callUpdatePermission(per, id);
        if (res && res?.data) {
            notification.success({
                message: "Cập nhật permission thành công!",
                duration: 1
            });
            await fetchData();
            setOpenModalUpdate(false);
        } else {
            notification.error({
                message: "Cập nhật permission có lỗi xảy ra!",
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
            </Modal>
        </>
    );
}
export default ModalUpdatePer;