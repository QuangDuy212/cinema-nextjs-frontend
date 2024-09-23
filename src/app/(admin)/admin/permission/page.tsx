import { Metadata } from "next";
import AdminPermission from "src/components/admin/permission/app.admin.permission";
export const metadata: Metadata = {
    title: 'Admin Permission',
    description: 'Manage Permission',
}
const PermissionPage = () => {
    return (
        <>
            <AdminPermission />
        </>
    )
}
export default PermissionPage;