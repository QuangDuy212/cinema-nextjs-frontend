import { Metadata } from "next";
import AdminFilm from "src/components/admin/film/app.admin.film";
export const metadata: Metadata = {
    title: 'Admin Film',
    description: 'Manage Film',
}
const FilmPage = () => {
    return (
        <>
            <AdminFilm />
        </>
    )
}
export default FilmPage;