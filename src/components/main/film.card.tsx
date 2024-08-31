
'use client'
import 'src/styles/main/film.card.scss';

const FilmCard = () => {
    return (
        <div className="film-card">
            <div className="film-card__img">
                <img alt="Bo ga siu dang" src="/home/1.png" />
            </div>
            <div className='film-card__info'>
                <div className='category'>
                    Hài, Tâm lý, tình cảm
                </div>
                <div className='time'>
                    02/09/2024
                </div>
            </div>
            <div className='film-card__name'>
                LÀM GIÀU VỚI MA-T16
            </div>
        </div>
    )
}
export default FilmCard;