"use client"

import { Form, Input, Modal, notification, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { callFetchAllPermissions, callUpdateRole } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: IRole | undefined;
}
const ModalUpdateRole = (props: IProps) => {
    //PROPS: 
    const { openModalUpdate, setOpenModalUpdate, fetchData, data } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [listPer, setListPer] = useState<IPermission[]>([]);

    //LIB: 
    const [form] = Form.useForm();


    //METHODS: 
    useEffect(() => {
        if (data)
            form.setFieldsValue(data)
    }, [data])

    //EFFECT :
    useEffect(() => {
        fetchPer();
    }, [])

    //SELECT: 
    const options: SelectProps['options'] = listPer?.map((i: IPermission) => {
        return {
            value: i?.id,
            label: i?.name,
        }
    });

    const fetchPer = async () => {
        const res = await callFetchAllPermissions("?page=1&size=100");
        if (res && res?.data) {
            const data = res?.data?.result;
            // data?.map((i: IPermission) => {
            //     options.push({
            //         value: i?.id,
            //         label: i?.name,
            //     });
            // })
            setListPer(data);
        }

    }

    const onFinish = async (values: {
        id: number;
        name: string;
        apiPath: string;
        method: string;
        module: string;
    }) => {
        const { id, name, apiPath, method, module } = values;
        const per = { name, apiPath, method, module };
        const res = await callUpdateRole(per, id);
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