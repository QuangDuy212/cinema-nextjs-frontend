"use client"
import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BugOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from 'antd';
import { isMobile } from 'react-device-detect';
import type { MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { ALL_PERMISSIONS } from 'src/config/permissions';
import Link from 'next/link';
import { callLogout } from 'src/util/api';
import { setLogoutAction } from 'src/redux/slice/accountSlide';
import { useRouter } from 'next/navigation';
import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import { FaFilm } from 'react-icons/fa';
import { FaUserShield } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { PiSlideshowLight } from "react-icons/pi";
import { BsCalendarDate } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { GoHistory } from "react-icons/go";

const { Content, Sider } = Layout;

const LayoutAdmin = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    //STATE: 
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

    //LIB: 
    const user = useAppSelector(state => state.account.user);
    const permissions = useAppSelector(state => state.account.user.role.permissions);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const ACL_ENABLE = process.env.NEXT_ACL_ENABLE;
        if (permissions?.length || ACL_ENABLE === 'false') {

            const viewUser = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            )

            const viewRole = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
            )

            const viewPermission = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            )

            const viewCategory = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.CATEGORIES.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.CATEGORIES.GET_PAGINATE.method
            )

            const viewFilm = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.FILMS.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.FILMS.GET_PAGINATE.method
            )

            const viewShow = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.SHOWS.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.SHOWS.GET_PAGINATE.method
            )

            const viewSeat = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.SEATS.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.SEATS.GET_PAGINATE.method
            )

            const viewBill = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.BILLS.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.BILLS.GET_PAGINATE.method
            )

            const viewTime = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.TIMES.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.TIMES.GET_PAGINATE.method
            )

            const viewHistory = permissions?.find(item =>
                item.apiPath === ALL_PERMISSIONS.HISTORIES.GET_PAGINATE.apiPath
                && item.method === ALL_PERMISSIONS.HISTORIES.GET_PAGINATE.method
            )

            const full = [
                {
                    label: <Link href='/admin'>Dashboard</Link>,
                    key: '/admin',
                    icon: <AppstoreOutlined />
                },
                ...(viewUser || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/user'>User</Link>,
                    key: '/admin/user',
                    icon: <UserOutlined />
                }] : []),

                ...(viewPermission || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/permission'>Permission</Link>,
                    key: '/admin/permission',
                    icon: <FaUserShield />
                }] : []),
                ...(viewRole || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/role'>Role</Link>,
                    key: '/admin/role',
                    icon: <FiUsers />
                }] : []),

                ...(viewBill || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/bill'>Bill</Link>,
                    key: '/admin/bill',
                    icon: <RiBillLine />
                }] : []),
                ...(viewFilm || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/film'>Film</Link>,
                    key: '/admin/film',
                    icon: <FaFilm />
                }] : []),
                ...(viewCategory || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/category'>Category</Link>,
                    key: '/admin/category',
                    icon: <BiCategoryAlt />
                }] : []),
                ...(viewShow || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/show'>Show</Link>,
                    key: '/admin/show',
                    icon: <PiSlideshowLight />
                }] : []),
                ...(viewTime || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/time'>Date</Link>,
                    key: '/admin/time',
                    icon: <BsCalendarDate />
                }] : []),
                ...(viewHistory || ACL_ENABLE === 'false' ? [{
                    label: <Link href='/admin/history'>History</Link>,
                    key: '/admin/history',
                    icon: <GoHistory />
                }] : []),
            ];

            // const full = [
            //     {
            //         label: <Link href='/admin'>Dashboard</Link>,
            //         key: '/admin',
            //         icon: <AppstoreOutlined />
            //     },
            //     {
            //         label: <Link href='/admin/user'>User</Link>,
            //         key: '/admin/user',
            //         icon: <UserOutlined />
            //     },
            //     {
            //         label: <Link href='/admin/permission'>Permission</Link>,
            //         key: '/admin/permission',
            //         icon: <FaUserShield />
            //     },
            //     {
            //         label: <Link href='/admin/role'>Role</Link>,
            //         key: '/admin/role',
            //         icon: <FiUsers />
            //     },
            //     {
            //         label: <Link href='/admin/bill'>Bill</Link>,
            //         key: '/admin/bill',
            //         icon: <RiBillLine />
            //     },
            //     {
            //         label: <Link href='/admin/film'>Film</Link>,
            //         key: '/admin/film',
            //         icon: <FaFilm />
            //     },
            //     {
            //         label: <Link href='/admin/category'>Category</Link>,
            //         key: '/admin/category',
            //         icon: <BiCategoryAlt />
            //     },
            //     {
            //         label: <Link href='/admin/show'>Show</Link>,
            //         key: '/admin/show',
            //         icon: <PiSlideshowLight />
            //     },
            //     {
            //         label: <Link href='/admin/time'>Date</Link>,
            //         key: '/admin/time',
            //         icon: <BsCalendarDate />
            //     },
            //     {
            //         label: <Link href='/admin/history'>History</Link>,
            //         key: '/admin/history',
            //         icon: <GoHistory />
            //     },
            // ]

            setMenuItems(full);
        }
    }, [permissions])


    useEffect(() => {
        setActiveMenu(location.pathname)
    }, [location])

    const handleLogout = async () => {
        const res = await callLogout();
        //@ts-ignore
        if (res && +res?.statusCode === 200) {
            message.success('Đăng xuất thành công');
            router.push("/")
            dispatch(setLogoutAction({}));
        }
    }

    // if (isMobile) {
    //     items.push({
    //         label: <label
    //             style={{ cursor: 'pointer' }}
    //             onClick={() => handleLogout()}
    //         >Đăng xuất</label>,
    //         key: 'logout',
    //         icon: <LogoutOutlined />
    //     })
    // }

    const itemsDropdown = [
        {
            label: <Link href={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    return (
        <>
            <Layout
                style={{ minHeight: '100vh' }}
                className="layout-admin"
            >
                {!isMobile ?
                    <Sider
                        theme='light'
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}>
                        <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                            <BugOutlined />  ADMIN
                        </div>
                        <Menu
                            selectedKeys={[activeMenu]}
                            mode="inline"
                            items={menuItems}
                            onClick={(e) => setActiveMenu(e.key)}
                        />
                    </Sider>
                    :
                    <Menu
                        selectedKeys={[activeMenu]}
                        items={menuItems}
                        onClick={(e) => setActiveMenu(e.key)}
                        mode="horizontal"
                    />
                }

                <Layout>
                    {!isMobile &&
                        <div className='admin-header' style={{ display: "flex", justifyContent: "space-between", marginRight: 20 }}>
                            <Button
                                type="text"
                                icon={collapsed ? React.createElement(MenuUnfoldOutlined) : React.createElement(MenuFoldOutlined)}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <Space style={{ cursor: "pointer" }}>
                                    Welcome {user?.fullName}
                                    <Avatar> {user?.fullName?.substring(0, 2)?.toUpperCase()} </Avatar>

                                </Space>
                            </Dropdown>
                        </div>
                    }
                    <Content style={{ padding: '15px' }}>
                        {children}
                    </Content>
                    {/* <Footer style={{ padding: 10, textAlign: 'center' }}>
                        React Typescript series Nest.JS &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                    </Footer> */}
                </Layout>
            </Layout>

        </>
    );
};

export default LayoutAdmin;