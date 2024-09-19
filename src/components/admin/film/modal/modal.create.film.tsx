"use client"
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Image, Input, message, Modal, notification, Select, SelectProps, Upload } from 'antd';
import { callCreateFilm, callUploadSingleFile } from 'src/util/api';
import TextArea from 'antd/lib/input/TextArea';
interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
    fetchData: () => void;
    categoriesOptions: SelectProps['options'];
}
const ModalCreateFilm = (props: IProps) => {
    //PROPS: 
    const { openModalCreate, setOpenModalCreate, fetchData, categoriesOptions } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [filmImage, setFilmImage] = useState<string>();

    //LIBRARY: 
    const [form] = Form.useForm();

    const getBase64 = (img: any, callback: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleUploadFile = async ({ file, onSuccess, onError }: any) => {
        const res = await callUploadSingleFile(file, "film");
        if (res && res?.data) {
            setFilmImage(res?.data?.fileName);
            if (onSuccess) onSuccess('ok')
        } else {
            if (onError) {
                setFilmImage("")
                //@ts-ignore
                const error = new Error(res?.message);
                onError({ event: error });
            }
        }
    }

    const handlePreview = async (file: any) => {
        if (!file.originFileObj) {
            setPreviewImage(file.url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            return;
        }
        getBase64(file.originFileObj, (url: string) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };



    const handleChange: any = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);

        }
        if (info.file.status === 'done') {
            setLoading(false);
        }
        if (info.file.status === 'error') {
            setLoading(false);
            message.error(info?.file?.error?.event?.message ?? "Đã có lỗi xảy ra khi upload file.")
        }
    };

    const handleRemoveFile = (file: any) => {
        setImageUrl("")
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
        "name": string;
        "director": string;
        "image": string;
        "performer": string;
        "premiere": string;
        "shortDesc": string;
        "contentModeration": string;
        "duration": number;
        "trailer": string;
        "category": number,
        "origin": string;
    }) => {
        const { name, director, image, performer, premiere, shortDesc, contentModeration,
            duration, trailer, category, origin
        } = values;
        const film = {
            name, director, image: filmImage ?? "", performer, premiere, shortDesc, contentModeration,
            duration, trailer, category: { id: category }, origin
        };
        setIsSubmit(true);
        const res = await callCreateFilm(film);
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Thêm mới Film thành công!");
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
                <Upload
                    name="logo"
                    listType="picture-card"
                    className="avatar-uploader"
                    maxCount={1}
                    multiple={false}
                    customRequest={handleUploadFile}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    onRemove={(file) => handleRemoveFile(file)}
                    onPreview={handlePreview}
                // defaultFileList={
                //     dataInit?.id ?
                //         [
                //             {
                //                 uid: uuidv4(),
                //                 name: dataInit?.logo ?? "",
                //                 status: 'done',
                //                 url: `${import.meta.env.VITE_BACKEND_URL}/storage/company/${dataInit?.logo}`,
                //             }
                //         ] : []
                // }

                >
                    <div>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
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
                        label='Director'
                        name="director"
                        rules={[{ required: true, message: 'Please input your director!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Performer'
                        name="performer"
                        rules={[{ required: true, message: 'Please input your performer!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Premiere'
                        name="premiere"
                        rules={[{ required: true, message: 'Please input your premiere!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Short description'
                        name="shortDesc"
                        rules={[{ required: true, message: 'Please input your shortDesc!' }]}
                    >
                        <TextArea rows={24} />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Content Moderation'
                        name="contentModeration"
                        rules={[{ required: true, message: 'Please input your contentModeration!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Duration'
                        name="duration"
                        rules={[{ required: true, message: 'Please input your duration!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Trailer'
                        name="trailer"
                        rules={[{ required: true, message: 'Please input your trailer!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Origin'
                        name="origin"
                        rules={[{ required: true, message: 'Please input your origin!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Category'
                        name="category"
                        rules={[{ required: true, message: 'Please input your category!' }]}
                    >
                        <Select
                            options={categoriesOptions}
                        />
                    </Form.Item>
                </Form>
            </Modal >
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
                style={{ zIndex: 1500 }}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}
export default ModalCreateFilm;