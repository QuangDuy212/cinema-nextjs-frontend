import { Metadata } from "next";
import AdminCategory from "src/components/admin/category/app.admin.cate";

export const metadata: Metadata = {
    title: 'Admin Category',
    description: 'Manage Category',
}
const CategoryPage = () => {
    return (
        <>
            <AdminCategory />
        </>
    )
}
export default CategoryPage;