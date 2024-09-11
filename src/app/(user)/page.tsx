import ContentHomepage from "src/components/user/main/content.homepage";
import SwiperComponent from "src/components/user/swiper-slide/swiper.slide";
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