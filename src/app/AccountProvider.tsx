'use client'

import { message } from "antd";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { fetchAccount, setRefreshTokenAction } from "src/redux/slice/accountSlide";

export default function AccountProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const isRefreshToken = useAppSelector(state => state.account.isRefreshToken);
    const errorRefreshToken = useAppSelector(state => state.account.errorRefreshToken);
    useEffect(() => {
        if (
            window.location.pathname === '/auth/signin'
            || window.location.pathname === '/auth/register'
        )
            return;
        if (localStorage.getItem('access_token'))
            dispatch(fetchAccount())
    }, [])

    useEffect(() => {
        if (isRefreshToken === true) {
            localStorage.removeItem('access_token')
            message.error(errorRefreshToken);
            dispatch(setRefreshTokenAction({ status: false, message: "" }))
            router.push("/auth/signin");
        }
    }, [isRefreshToken]);

    return <>{children}</>;
}