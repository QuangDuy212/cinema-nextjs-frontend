import ContentMoviesPage from "src/components/user/movies/content.moviespage";
import { callFetchAllFilms, callFetchAllTimes } from "src/util/api";
import { sendRequest } from "src/util/method";


const MoviePage = async () => {
    const films = await sendRequest<IBackendRes<IModelPaginate<IFilm>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/films?page=1&size=1000`,
        method: "GET",
    });

    const times = await sendRequest<IBackendRes<IModelPaginate<ITime>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/times?page=1&size=2`,
        method: "GET",
    });
    return (
        <>
            <ContentMoviesPage films={films?.data?.result} times={times?.data?.result} />
        </>
    )
}
export default MoviePage;