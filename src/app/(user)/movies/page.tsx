import ContentMoviesPage from "src/components/user/movies/content.moviespage";
import { callFetchAllFilms, callFetchAllTimes } from "src/util/api";
import { sendRequest } from "src/util/method";


const MoviePage = async () => {
    return (
        <>
            <ContentMoviesPage />
        </>
    )
}
export default MoviePage;