'use client'

import { use, useEffect } from "react";
import { useAppDispatch } from "src/redux/hook";
import { fetchAccount } from "src/redux/slice/accountSlide";

export default function AccountProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (
            window.location.pathname === '/auth/signin'
            || window.location.pathname === '/auth/register'
        )
            return;
        dispatch(fetchAccount())
    }, [])

    return <>{children}</>;
}