'use client'
import 'src/styles/movies/film.movies.scss';

const FilmMovies = () => {
    return (
        <>
            <div className="movie">
                <div className="movie__image">
                    <img alt="Bo ga siu dang" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/1725246694444-deadpool.png`} />
                </div>
                <div className="movie__info">
                    <div className="start">
                        <span className="category">Hài, Tâm lý, tình cảm</span>
                        <span className="duration">113 phút</span>
                    </div>
                    <div className="name">
                        Làm giàu với MA
                    </div>
                    <div className="detail">
                        <div className="origin">Xuất xứ: </div>
                        <div className="pre">Khởi chiếu: </div>
                    </div>
                    <div className="certificate">
                        T16 - Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+)
                    </div>
                    <div className="calendar">
                        <div className="item"> 11:00</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FilmMovies;