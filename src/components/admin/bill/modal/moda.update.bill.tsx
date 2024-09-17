"use client"

import { Form, Input, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { callUpdateBill } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: IBill | undefined;
}
const ModalUpdateBill = (props: IProps) => {
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
        id: number;
        status: string
    }) => {
        const { id, status } = values;
        const data = { id, status };
        setIsSubmit(true);
        const res = await callUpdateBill(data);
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới Bill thành công!");
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
                title="Update Bill"
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
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Status'
                        name="status"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Select
                            options={[
                                { value: "PENDING", label: "PENDING" },
                                { value: "SUCCESS", label: "SUCCESS" },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}
export default ModalUpdateBill;