import ContentHomepage from "src/components/main/content.homepage";
import FilmCard from "src/components/main/film.card";
import SwiperComponent from "src/components/swiper-slide/swiper.slide";
import { callFetchAllFilms } from "src/util/api";


const Home = async () => {

  const films = await callFetchAllFilms();
  return (
    <>
      <SwiperComponent />
      <ContentHomepage data={films?.data?.data?.result} />
    </>
  )
}
export default Home;