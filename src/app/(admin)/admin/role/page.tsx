import { Metadata } from "next";
import AdminRole from "src/components/admin/role/app.admin.role";
export const metadata: Metadata = {
    title: 'Admin Role',
    description: 'Manage Role',
}
const RolePage = () => {
    return (
        <>
            <AdminRole />
        </>
    )
}
export default RolePage;