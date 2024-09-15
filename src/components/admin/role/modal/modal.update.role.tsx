"use client"

import { Form, Input, message, Modal, notification, Select, SelectProps } from "antd";
import { permission } from "process";
import { useEffect, useState } from "react";
import { callFetchAllPermissions, callUpdateRole } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: IRole | undefined;
    options: SelectProps['options'];
}
const ModalUpdateRole = (props: IProps) => {
    //PROPS: 
    const { openModalUpdate, setOpenModalUpdate, fetchData, data, options } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    //LIB: 
    const [form] = Form.useForm();


    //METHODS: 
    useEffect(() => {
        if (data) {
            const per = data?.permissions?.map(i => i.id);
            const updateData = { ...data, permissions: per };
            form.setFieldsValue(updateData)
        }
    }, [data])

    const onFinish = async (values: {
        "id"?: number;
        "name"?: string;
        "description"?: string;
        "permissions"?: number[];
        "active"?: boolean;
    }) => {
        const { id, name, description, permissions } = values;
        const newPer = permissions?.map(i => { return { "id": i } });
        const role = { name, description, permissions: newPer, active: true };
        setIsSubmit(true);
        const res = await callUpdateRole(role, id)
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới permission thành công!");
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
                        label='Name'
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Description'
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
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
                        label='Permissions'
                        name="permissions"
                        rules={[{ required: true, message: 'Please input your permissions!' }]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            tokenSeparators={[',']}
                            options={options}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}
export default ModalUpdateRole;