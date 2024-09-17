"use client"

import { Badge, Descriptions, Drawer } from "antd";

interface IProps {
    openModalView: boolean;
    setOpenModalView: (v: boolean) => void;
    fetchData: () => void;
    data: ITime | undefined;
}
const ModalViewDate = (props: IProps) => {
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
                    <Descriptions.Item label="Date">{data?.date}</Descriptions.Item>
                    <Descriptions.Item label="Active" span={24}>
                        <Badge status="processing" text={data?.active?.toString()} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Permissions" span={24}>
                        <div style={{ display: "flex" }}>
                            {data?.shows?.map((i, index) =>
                                <div key={i?.id}
                                    style={{ padding: "4px", border: "1px solid #ccc", marginRight: "2px", borderRadius: "5px" }}
                                >{i?.time}</div>
                            )}
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </Drawer >
        </>
    )
}
export default ModalViewDate;