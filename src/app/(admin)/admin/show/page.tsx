import { Metadata } from "next";
import AdminShow from "src/components/admin/show/app.admin.show";
export const metadata: Metadata = {
    title: 'Admin Show',
    description: 'Manage Show',
}
const ShowPage = () => {
    return (
        <>
            <AdminShow />
        </>
    )
}
export default ShowPage;