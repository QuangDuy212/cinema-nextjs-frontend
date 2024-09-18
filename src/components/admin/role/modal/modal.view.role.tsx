"use client"

import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";

interface IProps {
    openModalView: boolean;
    setOpenModalView: (v: boolean) => void;
    fetchData: () => void;
    data: IRole | undefined;
}
const ModalViewRole = (props: IProps) => {
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
                    <Descriptions.Item label="Description">{data?.description}</Descriptions.Item>
                    <Descriptions.Item label="Active">
                        <Badge status="processing" text={data?.active?.toString()} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Permissions" span={24}>
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                            {data?.permissions?.map((i, index) =>
                                <div key={i?.id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "4px" }}>
                                    {i?.name}
                                </div>
                            )}
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at ">
                        {moment(data?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created By ">
                        {data?.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated at ">
                        {moment(data?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated By ">
                        {data?.updatedBy}
                    </Descriptions.Item>


                </Descriptions>
            </Drawer >
        </>
    )
}
export default ModalViewRole;