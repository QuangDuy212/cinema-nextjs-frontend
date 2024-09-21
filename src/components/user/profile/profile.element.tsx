'use client'
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, message, notification, Row } from 'antd';
import { stat } from 'fs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hook';
import { setUserLoginInfo } from 'src/redux/slice/accountSlide';
import 'src/styles/profile/profile.element.scss'
import { callFetchAccount, callUpdateUser } from 'src/util/api';
import ModalChangePassword from './modal.change.password';
const ProfileElement = () => {
    //STATE: 
    const [data, setData] = useState<IUser>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    //LIB:
    const [form] = Form.useForm();

    //REDUX: 
    const user = useAppSelector(state => state.account.user);
    const dispatch = useDispatch();


    type FieldType = {
        id?: number;
        fullName?: string;
        email?: string;
        phone?: string;
        address?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { id, fullName, phone, address } = values;
        const reqUpdate = { id, fullName, phone, address }
        const res = await callUpdateUser(reqUpdate);
        if (res && res?.data) {
            dispatch(setUserLoginInfo(res?.data))
            message.success('Sửa thông tin thành công!');
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                //@ts-ignore
                description: res?.message,
                duration: 5
            })
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
    }, [])
    return (
        <>
            <div style={{
                maxWidth: "900px", display: "flex", justifyContent: "center", alignItems: "center"
            }} className='profile-ele-container'>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    style={{ width: "100%" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='form-profile'
                >
                    <Form.Item<FieldType>
                        label="ID"
                        name="id"
                        initialValue={user.id}
                        hidden
                    >
                        <Input
                            className='input-profile' />
                    </Form.Item>
                    <Row gutter={[20, 20]}>
                        <Col md={24} xl={12}>
                            <Form.Item<FieldType>
                                label="Tên"
                                name="fullName"
                                rules={[{ required: true, message: 'Không được để trống' }]}
                                initialValue={user.fullName}
                            >
                                <Input
                                    className='input-profile' />
                            </Form.Item>
                        </Col>
                        <Col md={24} xl={12}>
                            <Form.Item<FieldType>
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Không được để trống' }]}
                                initialValue={user?.phone}
                            >
                                <Input
                                    className='input-profile' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]}>
                        <Col md={24} xl={12}>
                            <Form.Item<FieldType>
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Không được để trống' }]}
                                initialValue={user?.address}
                            >
                                <Input
                                    className='input-profile' />
                            </Form.Item>
                        </Col>
                        <Col md={24} xl={12}>
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                initialValue={user?.email}
                            >
                                <Input
                                    className='input-profile' disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item wrapperCol={{ offset: 10, }} >
                        <div style={{ display: "flex", gap: "20px" }}>
                            <div className='button-form' >
                                <div className='item'
                                    onClick={() => setOpenModal(true)}
                                >Đổi mật khẩu</div>
                            </div>

                            <div className='button-form'>
                                <button className='item active'
                                    type='submit'
                                >Lưu thông tin</button>
                            </div>
                        </div>
                    </Form.Item>

                </Form>
            </div>
            <ModalChangePassword
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    )
}
export default ProfileElement;