import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./ShowSwiper.module.scss";
import img4 from "./../assets/world/show/phone_bottom.507727ba@2x.png";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper";
export default function ShowSwiper({ getShowSwiperIndex }: any) {
  return (
    <div className={styles.ShowSwiperContainer}>
      <Swiper
        navigation={true}
        slidesPerView={3}
        centeredSlides={true}
        initialSlide={1}
        spaceBetween={10}
        grabCursor={true}
        loop={false}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[Pagination, Navigation, EffectCoverflow]}
        className="mySwiper"
        onSlideChange={(swiperInst) => {
          getShowSwiperIndex(swiperInst.activeIndex);
        }}
      >
        <SwiperSlide className={styles.slideCona}>
          <div className={styles.test1}></div>
        </SwiperSlide>
        <SwiperSlide className={styles.slideCona}>
          <div className={styles.test2}></div>
        </SwiperSlide>
        <SwiperSlide className={styles.slideCona}>
          <div className={styles.test3}></div>
        </SwiperSlide>
      </Swiper>
      <img className={styles.bottomImg} src={img4} alt="" />
    </div>
  );
}
