"use client"

import { Descriptions, Drawer } from "antd";
import moment from "moment";

interface IProps {
    openModalView: boolean;
    setOpenModalView: (v: boolean) => void;
    fetchData: () => void;
    data: IPermission | undefined;
}
const ModalViewPer = (props: IProps) => {
    //PROPS:
    const { openModalView, setOpenModalView, fetchData, data } = props;

    //METHODS: 
    const onClose = () => {
        setOpenModalView(false);
    }

    return (
        <>
            <Drawer
                title="User Information"
                onClose={onClose}
                open={openModalView}
                width={'50vw'}
            >
                <Descriptions
                    title="User"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                >
                    <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
                    <Descriptions.Item label="API path">{data?.apiPath}</Descriptions.Item>
                    <Descriptions.Item label="Method">{data?.method}</Descriptions.Item>
                    <Descriptions.Item label="Module">{data?.module}</Descriptions.Item>
                    <Descriptions.Item label="Created at ">
                        {moment(data?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated at ">
                        {moment(data?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>


                </Descriptions>
            </Drawer >
        </>
    )
}
export default ModalViewPer;