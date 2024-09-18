"use client"

import { Badge, Descriptions, Drawer, Image } from "antd";
import moment from "moment";

interface IProps {
    openModalView: boolean;
    setOpenModalView: (v: boolean) => void;
    fetchData: () => void;
    data: IFilm | undefined;
}
const ModalViewFilm = (props: IProps) => {
    //PROPS:
    const { openModalView, setOpenModalView, fetchData, data } = props;

    //METHODS: 
    const onClose = () => {
        setOpenModalView(false);
    }

    return (
        <>
            <Drawer
                title="Film Information"
                onClose={onClose}
                open={openModalView}
                width={'50vw'}

            >
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${data?.image}`}
                        width={150} height={150}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <Descriptions
                    title="Film"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                >

                    <Descriptions.Item label="ID" span={24}>{data?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name" span={24}>{data?.name}</Descriptions.Item>
                    <Descriptions.Item label="Director" span={24}>{data?.director}</Descriptions.Item>
                    <Descriptions.Item label="Performer" span={24}>{data?.performer}</Descriptions.Item>
                    <Descriptions.Item label="Premiere">{data?.premiere}</Descriptions.Item>
                    <Descriptions.Item label="Duration">{data?.duration}</Descriptions.Item>
                    <Descriptions.Item label="Short description" span={24}>{data?.shortDesc}</Descriptions.Item>
                    <Descriptions.Item label="Content Moderation" span={24}>{data?.contentModeration}</Descriptions.Item>
                    <Descriptions.Item label="Trailer" span={24}>{data?.trailer}</Descriptions.Item>
                    <Descriptions.Item label="Category" span={24}>{data?.category?.name}</Descriptions.Item>
                    <Descriptions.Item label="Origin" >{data?.origin}</Descriptions.Item>
                    <Descriptions.Item label="Active">
                        <Badge status="processing" text={data?.active?.toString()} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at " span={24}>
                        {moment(data?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created By " span={24}>
                        {data?.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated at " span={24}>
                        {moment(data?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated By " span={24}>
                        {data?.updatedBy}
                    </Descriptions.Item>


                </Descriptions>
            </Drawer >
        </>
    )
}
export default ModalViewFilm;