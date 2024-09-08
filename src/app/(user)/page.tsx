import ContentHomepage from "src/components/main/content.homepage";
import SwiperComponent from "src/components/swiper-slide/swiper.slide";
import { callFetchAllFilms } from "src/util/api";


const Home = async () => {

  return (
    <>
      <SwiperComponent />
      <ContentHomepage />
    </>
  )
}
export default Home;