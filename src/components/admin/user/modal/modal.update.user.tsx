"use client"

import { Form, Input, Modal, notification, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "src/util/api";
interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchUser: () => void;
    data: IUser | null;
    roleOptions: SelectProps['options'];
}
const ModalUpdateUser = (props: IProps) => {
    //PROPS:
    const { fetchUser, openModalUpdate, setOpenModalUpdate, data, roleOptions } = props;

    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [form] = Form.useForm();

    //METHOD: 
    useEffect(() => {
        if (data) {
            const idRole = data?.role?.id;
            const dataUpdate = { ...data, role: idRole }
            form.setFieldsValue(dataUpdate)
        }
    }, [data])

    const onFinish = async (values: {
        id: number | undefined,
        fullName: string | undefined,
        phone: string | undefined,
        address: string | undefined,
        active: boolean;
        role: number
    }) => {
        const { id, fullName, phone, address, active, role } = values;
        const data = { id, fullName, phone, address, active, role: { id: role } }
        console.log(">>> check data: ", data);
        const res = await callUpdateUser(data);
        console.log(">>> check res: ", res)
        if (res && res?.data) {
            notification.success({
                message: "Cập nhật tài khoản thành công!",
                duration: 1
            });
            await fetchUser();
            setOpenModalUpdate(false);
        } else {
            notification.error({
                message: "Cập nhật tài khoản có lỗi xảy ra!",
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
                        rules={[{ required: true, message: 'Please input your fullName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Full name'
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your fullName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Email'
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input disabled />
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
                        label='Role'
                        name="role"
                        rules={[{ required: true, message: 'Please input your role!' }]}
                    >
                        <Select
                            options={roleOptions}
                        />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Phone number'
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Address'
                        name="address"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default ModalUpdateUser;