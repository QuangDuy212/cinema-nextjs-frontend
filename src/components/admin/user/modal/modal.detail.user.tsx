"use client"

import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";
interface IProps {
    openViewDetail: boolean;
    setOpenViewDetail: (v: boolean) => void;
    data: IUser | null;
}
const ModalDetailUser = (props: IProps) => {
    const { data, openViewDetail, setOpenViewDetail } = props;
    const onClose = () => {
        setOpenViewDetail(false);
    }
    return (
        <>
            <Drawer
                title="User Information"
                onClose={onClose}
                open={openViewDetail}
                width={'50vw'}
            >
                <Descriptions
                    title="User"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                >
                    <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{data?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Điện thoại">{data?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{data?.address}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}> <Badge status="processing" text="USER" /></Descriptions.Item>
                    <Descriptions.Item label="Create at ">
                        {moment(data?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Update at ">
                        {moment(data?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>


                </Descriptions>
            </Drawer >
        </>
    )
}
export default ModalDetailUser;