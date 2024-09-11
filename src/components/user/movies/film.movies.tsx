'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'src/styles/movies/film.movies.scss';
import { callFetchShowsByFilmAndDay } from 'src/util/api';
import { convertSlugUrl } from 'src/util/method';

interface IProps {
    film: IFilm;
    dayId: number;
}
const FilmMovies = (props: IProps) => {
    //PROPS: 
    const { film, dayId } = props;

    //STATE:
    const [shows, setShows] = useState<IShow[]>();


    // LIB: 
    const router = useRouter();
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
                <div className="movie__image"
                    onClick={() => router.push(`/movies/${convertSlugUrl(film.name)}-${film.id}.html`)}
                >
                    <img alt={`${film.name}`}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${film.image}`} />
                </div>
                <div className="movie__info">
                    <div className="start">
                        <span className="category"
                            onClick={() => router.push(`/movies/${convertSlugUrl(film.name)}-${film.id}.html`)}
                        >
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
                                    <span className="item" key={show.id}
                                        onClick={() => router.push(`/movies/${convertSlugUrl(film.name)}-${film.id}.html`)}
                                    > {show.time}</span>

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