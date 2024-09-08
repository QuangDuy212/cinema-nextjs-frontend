'use client'
import { useEffect, useState } from 'react';
import 'src/styles/movies/film.movies.scss';
import { callFetchShowsByFilmAndDay } from 'src/util/api';

interface IProps {
    film: IFilm;
    dayId: number;
}
const FilmMovies = (props: IProps) => {
    const { film, dayId } = props;
    const [shows, setShows] = useState<IShow[]>();
    useEffect(() => {
        const fetchTimes = async () => {
            const times = await callFetchShowsByFilmAndDay(film?.id, dayId);
            setShows(times?.data);
        }
        fetchTimes();
    }, [dayId])
    return (
        <>
            <div className="movie">
                <div className="movie__image">
                    <img alt={`${film.name}`}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${film.image}`} />
                </div>
                <div className="movie__info">
                    <div className="start">
                        <span className="category">
                            {film.category.name}
                        </span>
                        <span className="duration">
                            {film.duration} phút
                        </span>
                    </div>
                    <div className="name">
                        <a>{film.name}</a>
                    </div>
                    <div className="detail">
                        <div className="origin">Xuất xứ: {film.origin}</div>
                        <div className="pre">Khởi chiếu: {film.premiere}</div>
                    </div>
                    <div className="certificate">
                        {film.contentModeration}
                    </div>
                    <div className="calendar">
                        <div className='title-cal'>Lịch chiếu</div>
                        <div className='time'>
                            {shows?.map((show) => {
                                return (
                                    <span className="item" key={show.id}> {show.time}</span>

                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FilmMovies;