import { Metadata } from "next";
import AdminBill from "src/components/admin/bill/app.admin.bill";

export const metadata: Metadata = {
    title: 'Admin Bill',
    description: 'Manage user bill',
  }
const BillPage = () => {
    return (
        <>
            <AdminBill />
        </>
    )
}
export default BillPage;
