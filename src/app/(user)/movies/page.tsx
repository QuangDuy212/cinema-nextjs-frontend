import { Metadata } from "next";
import ContentMoviesPage from "src/components/user/movies/content.moviespage";

export const metadata: Metadata = {
    title: 'Movies page',
    description: 'Movies page',
}
const MoviePage = async () => {
    return (
        <>
            <ContentMoviesPage />
        </>
    )
}
export default MoviePage;