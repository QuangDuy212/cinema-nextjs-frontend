"use client"

import { Descriptions, Drawer } from "antd";
import moment from "moment";
import { formatter } from "src/util/method";

interface IProps {
    openModalView: boolean;
    setOpenModalView: (v: boolean) => void;
    fetchData: () => void;
    data: IShow | undefined;
}
const ModalViewShow = (props: IProps) => {
    //PROPS:
    const { openModalView, setOpenModalView, fetchData, data } = props;

    //METHODS: 
    const onClose = () => {
        setOpenModalView(false);
    }

    return (
        <>
            <Drawer
                title="Show Information"
                onClose={onClose}
                open={openModalView}
                width={'50vw'}
            >
                <Descriptions
                    title="Show"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                >
                    <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
                    <Descriptions.Item label="Zoom number">{data?.zoomNumber}</Descriptions.Item>
                    <Descriptions.Item label="Time">{data?.time}</Descriptions.Item>
                    <Descriptions.Item label="Price">{formatter.format(data?.price ?? 0)}</Descriptions.Item>
                    <Descriptions.Item label="Day">{data?.day?.date}</Descriptions.Item>
                </Descriptions>
            </Drawer >
        </>
    )
}
export default ModalViewShow;