import { Metadata } from "next";
import AdminDate from "src/components/admin/date/app.admin.date";
export const metadata: Metadata = {
    title: 'Admin Time',
    description: 'Manage Time',
}
const TimePage = () => {
    return (
        <>
            <AdminDate />
        </>
    )
}
export default TimePage;