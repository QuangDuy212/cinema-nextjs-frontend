import ContentMoviesPage from "src/components/movies/content.moviespage";
import { callFetchAllFilms, callFetchAllTimes } from "src/util/api";


const MoviePage = async () => {
    const films = await callFetchAllFilms();
    const times = await callFetchAllTimes();
    return (
        <>
            <ContentMoviesPage films={films?.data?.data?.result} times={times?.data?.data?.result} />
        </>
    )
}
export default MoviePage;