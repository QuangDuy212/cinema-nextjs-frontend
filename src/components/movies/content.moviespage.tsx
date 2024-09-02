'use client'

import FilmMovies from "./film.movies";
import 'src/styles/movies/content.moviespage.scss';

const ContentMoviesPage = () => {
    return (
        <>
            <div className="movie-container">
                <div className="container">
                    <FilmMovies />

                </div>
            </div>
        </>
    )
}
export default ContentMoviesPage;