import { Metadata } from "next";
import DashboardPage from "src/components/admin/dashboard/dashboard";
export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Manage Dashboard',
}
const AdminPage = async () => {
    return (
        <><DashboardPage /></>
    )
}
export default AdminPage;