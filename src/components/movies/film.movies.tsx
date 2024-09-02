'use client'
import 'src/styles/movies/film.movies.scss';

interface IProps {
    film: IFilm;
}
const FilmMovies = (props: IProps) => {
    const { film } = props;
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
                        <div className="origin">Xuất xứ: VietName</div>
                        <div className="pre">Khởi chiếu: {film.premiere}</div>
                    </div>
                    <div className="certificate">
                        {film.contentModeration}
                    </div>
                    <div className="calendar">
                        <div className='title-cal'>Lịch chiếu</div>
                        <div className='time'>
                            <span className="item"> 11:00</span>
                            <span className="item"> 12:00</span>
                            <span className="item"> 13:00</span>
                            <span className="item"> 14:00</span>
                            <span className="item"> 15:00</span>
                            <span className="item"> 15:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FilmMovies;