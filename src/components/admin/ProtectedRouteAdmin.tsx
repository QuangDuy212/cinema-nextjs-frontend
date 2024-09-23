'use client'

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useAppSelector } from "src/redux/hook";

const ProtectedRouteAdmin = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const role = useAppSelector(state => state.account?.user?.role);
    const router = useRouter();
    useEffect(() => {
    }, [])
    return (
        <>
            {(role && role.name == "ADMIN")
                ?
                children
                :
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" onClick={() => router.push("/")}>Back Home</Button>}
                />
            }
        </>
    )
}

export default ProtectedRouteAdmin;