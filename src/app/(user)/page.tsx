import { Metadata } from "next";
import ContentHomepage from "src/components/user/main/content.homepage";
import SwiperComponent from "src/components/user/swiper-slide/swiper.slide";
import { callFetchAllFilms } from "src/util/api";

export const metadata: Metadata = {
  title: 'Trung tâm chiếu phim quốc gia',
  description: 'Trung tâm chiếu phim quốc gia',
}
const Home = async () => {

  return (
    <>
      <SwiperComponent />
      <ContentHomepage />
    </>
  )
}
export default Home;