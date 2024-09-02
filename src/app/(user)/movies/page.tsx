import ContentMoviesPage from "src/components/movies/content.moviespage";
import { callFetchAllFilms } from "src/util/api";

const MoviePage = async () => {
    const films = await callFetchAllFilms();
    return (
        <>
            <ContentMoviesPage films={films?.data?.data?.result} />
        </>
    )
}
export default MoviePage;