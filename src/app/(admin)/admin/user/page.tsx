import { Metadata } from "next";
import AppAdminUser from "src/components/admin/user/app.admin.user";
export const metadata: Metadata = {
    title: 'Admin User',
    description: 'Manage User',
}
const UserPage = async () => {
    return (
        <>
            <AppAdminUser />
        </>
    )
}
export default UserPage;