'use client'

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/hook";
import { fetchAccount } from "src/redux/slice/accountSlide";
import { RootState } from "src/redux/store";
import Cookies from 'js-cookie';

export default function AccountProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.account.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated && Cookies.get('refresh_token')) {
            if (
                window.location.pathname === '/auth/signin'
                || window.location.pathname === '/auth/register'
            )
                return;
            dispatch(fetchAccount())
        }
    })

    return children;
}