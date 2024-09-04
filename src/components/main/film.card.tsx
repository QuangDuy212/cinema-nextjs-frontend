
'use client'
import { redirect, useRouter } from 'next/navigation';
import 'src/styles/main/film.card.scss';
import { convertSlugUrl } from 'src/util/method';
interface IProps {
    film: IFilm
}
const FilmCard = (props: IProps) => {
    const { film } = props;

    const router = useRouter()
    return (
        <div className="film-card" onClick={() => router.push(`/movies/${convertSlugUrl(film.name)}-${film.id}.html`)}>
            <div className="film-card__img">
                <img alt="Bo ga siu dang" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/film/${film.image}`} />
            </div>
            <div className='film-card__info'>
                <div className='category'>
                    {film.category.name}
                </div>
                <div className='time'>
                    {film.premiere}
                </div>
            </div>
            <div className='film-card__name'>
                {film.name}
            </div>
        </div>
    )
}
export default FilmCard;