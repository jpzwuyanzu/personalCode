// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from './ShowSwiper.module.scss'
import img1 from './../assets/world/zanzu/img01.png'
import img2 from './../assets/world/zanzu/img02.png'
import img3 from './../assets/world/zanzu/img03.png'


// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper";
export default function ShowSwiper({ getShowSwiperIndex }: any) {

  return (
    <div className={ styles.ShowSwiperContainer }>
      <Swiper
        navigation={ true }
        slidesPerView={1.8}
        centeredSlides={true}
        spaceBetween={10}
        grabCursor={true}
        loop={ false }
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        modules={[Pagination, Navigation, EffectCoverflow]}
        className="mySwiper"
        onSlideChange={(swiperInst) => {
          getShowSwiperIndex(swiperInst.activeIndex)
        }}
      >
        <SwiperSlide className={ styles.slideCona }>
          <img className={ styles.swipImgC } src={ img1 } alt=""/>
        </SwiperSlide>
        <SwiperSlide className={ styles.slideCona }>
        <img className={ styles.swipImgC } src={ img2 } alt=""/>
        </SwiperSlide>
        <SwiperSlide className={ styles.slideCona }>
        <img className={ styles.swipImgC } src={ img3 } alt=""/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}