"use client"

import { Form, Input, message, Modal, notification, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { callCreateRole, callFetchAllPermissions } from "src/util/api";

interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
    fetchData: () => void;
    options: SelectProps['options'];
}
const ModalCreateRole = (props: IProps) => {
    //PROPS: 
    const { openModalCreate, setOpenModalCreate, fetchData, options } = props;
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
        "name"?: string;
        "description"?: string;
        "permissions"?: number[];
        "active"?: boolean;
    }) => {
        const { name, description, permissions } = values;
        const newPer = permissions?.map(i => { return { "id": i } });
        const role = { name, description, permissions: newPer, active: true };
        setIsSubmit(true);
        const res = await callCreateRole(role)
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới Role thành công!");
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
                title="Thêm mới Role"
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            tokenSeparators={[',']}
                            options={options}
                        />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )

}
export default ModalCreateRole;