"use client"

import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";

interface IProps {
    openModalView: boolean;
    setOpenModalView: (v: boolean) => void;
    fetchData: () => void;
    data: IBill | undefined;
}
const ModalViewBill = (props: IProps) => {
    //PROPS:
    const { openModalView, setOpenModalView, fetchData, data } = props;

    //METHODS: 
    const onClose = () => {
        setOpenModalView(false);
    }

    return (
        <>
            <Drawer
                title="Bill Information"
                onClose={onClose}
                open={openModalView}
                width={'50vw'}
            >
                <Descriptions
                    title="Bill"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                >
                    <Descriptions.Item label="ID">{data?.id}</Descriptions.Item>
                    <Descriptions.Item label="Date">{data?.date}</Descriptions.Item>
                    <Descriptions.Item label="Zoom number">{data?.zoomNumber}</Descriptions.Item>
                    <Descriptions.Item label="Show">{data?.show}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{data?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Total price">{data?.total}</Descriptions.Item>
                    <Descriptions.Item label="Film" span={24}>{data?.nameFilm}</Descriptions.Item>
                    <Descriptions.Item label="Seats" span={24}>{data?.seats?.map(i => {
                        return (
                            <span key={i?.id}
                                style={{ padding: "4px", border: "1px solid #ccc", borderRadius: "5px", marginRight: "4px" }}
                            >{i.name}</span>
                        )
                    })}</Descriptions.Item>
                    <Descriptions.Item label="User">{data?.user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {data?.status === "PENDING"
                            ?
                            <Badge status="processing" text={data?.status} />
                            :
                            <Badge status="success" text={data?.status} />
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at ">
                        {moment(data?.createdAt ?? "").format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created By ">
                        {data?.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated at ">
                        {moment(data?.updatedAt ?? "").format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated By ">
                        {data?.updatedBy}
                    </Descriptions.Item>

                </Descriptions>
            </Drawer >
        </>
    )
}
export default ModalViewBill;