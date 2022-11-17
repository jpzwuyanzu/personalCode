import React, { useState } from 'react'
import styles from './Show.module.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Img1 from './../../assets/pcImg/show/01.png'
import Img2 from './../../assets/pcImg/show/02.png'
import Img3 from './../../assets/pcImg/show/03.png'
import Img4 from './../../assets/pcImg/show/bottom.png'

import { EffectCoverflow, Pagination, Navigation } from "swiper";

export default function Show() {
    const [activeIndex, setActiveIndex] = useState(1)
    return (
       <div className={styles.showPage_container}>
           <div className={ styles.top_title_line }>
           { activeIndex === 1 ? '全面覆盖各项体育赛事' : '丰富多彩的盘口玩法和业内最高的投注比例' }
           </div>
           <div className={ styles.show_swiper_container }>
           <Swiper
        navigation={ true }
        slidesPerView={4}
        centeredSlides={true}
        initialSlide={ 1 }
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
        //  console.log(swiperInst.activeIndex)
         setActiveIndex(swiperInst.activeIndex)
        }}
      >
        <SwiperSlide className={ styles.slideCona }>
          {/* <div className={ styles.Img1 }></div> */}
          <img className={ styles.swipImgC } src={ Img1 } alt=""/>
        </SwiperSlide>
        <SwiperSlide className={ styles.slideCona }>
        <img className={ styles.swipImgC } src={ Img2 } alt=""/>
        {/* <div className={ styles.Img2 }></div> */}
        </SwiperSlide>
        <SwiperSlide className={ styles.slideCona }>
        <img className={ styles.swipImgC } src={ Img3 } alt=""/>
        {/* <div className={ styles.Img3 }></div> */}
        </SwiperSlide>
      </Swiper>
      <img className={ styles.bottomImg } src={ Img4 } alt=""/>
           </div>
       </div>
    )
}
