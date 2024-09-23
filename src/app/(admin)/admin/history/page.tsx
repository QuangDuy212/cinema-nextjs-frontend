import { Metadata } from "next";
import AdminHistory from "src/components/admin/history/app.admin.history";
export const metadata: Metadata = {
    title: 'Admin History',
    description: 'Manage History',
}
const HistoryPage = () => {
    return (
        <>
            <AdminHistory />
        </>
    )
}
export default HistoryPage;