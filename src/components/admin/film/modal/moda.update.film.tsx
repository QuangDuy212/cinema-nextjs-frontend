"use client"

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, notification, Select, SelectProps, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useId, useState } from "react";
import { callUpdateFilm, callUploadSingleFile } from "src/util/api";

interface IProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: (v: boolean) => void;
    fetchData: () => void;
    data: IFilm | undefined;
    setData: (v: IFilm | undefined) => void;
    categoriesOptions: SelectProps['options'];
}
const ModalUpdateFilm = (props: IProps) => {
    //PROPS: 
    const { openModalUpdate, setOpenModalUpdate, fetchData, data, setData, categoriesOptions } = props;
    //STATE: 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [previewTitle, setPreviewTitle] = useState<string>('');
    const [filmImage, setFilmImage] = useState<string>();
    const [oldImage, setOldImage] = useState<any>()


    //LIB: 
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
            setOldImage([{
                uid: 1 + Math.random() * (100 - 1),
                name: data?.image ?? "",
                status: 'done',
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${res?.data?.fileName}`,
            }])
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


    //METHODS: 
    useEffect(() => {
        if (data) {
            const updateData = { ...data, category: data?.category?.id };
            form.setFieldsValue(updateData)
        }
        setOldImage(data ? [
            {
                uid: 1 + Math.random() * (100 - 1),
                name: data?.image ?? "",
                status: 'done',
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${data?.image}`,
            }
        ]
            : [])
    }, [data])



    const onFinish = async (values: {
        "id": number;
        "name"?: string;
        "director"?: string;
        "image"?: string;
        "active"?: boolean;
        "performer"?: string;
        "premiere"?: string;
        "shortDesc"?: string;
        "contentModeration"?: string;
        "duration"?: number;
        "trailer"?: string;
        "category"?: number,
        "origin"?: string;
    }) => {
        const { id, name, director, image, performer, premiere, shortDesc, contentModeration,
            duration, trailer, category, origin, active } = values;
        const film = {
            id, name, director, image: filmImage, performer, premiere, shortDesc, contentModeration,
            duration, trailer, category: { id: category ?? 0 }, origin, active
        };
        setIsSubmit(true);
        const res = await callUpdateFilm(film);
        setIsSubmit(false);
        if (res?.data && res) {
            message.success("Chỉnh sửa Film thành công!");
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
        form.resetFields();
        setData(undefined);
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
                    <Form.Item>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            maxCount={1}
                            multiple={false}
                            customRequest={handleUploadFile}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            onRemove={(file) => handleRemoveFile(file)}
                            onPreview={handlePreview}
                            fileList={oldImage}
                        >
                            <div>
                                {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
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
                        <TextArea />
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
            </Modal>
        </>
    );
}
export default ModalUpdateFilm;