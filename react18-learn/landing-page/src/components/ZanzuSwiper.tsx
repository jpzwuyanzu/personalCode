import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from './ZanzuSwiper.module.scss'
import Img1 from './../assets/world/zanzu/img01.png'
import Img2 from './../assets/world/zanzu/img02.png'
import Img3 from './../assets/world/zanzu/img03.png'
import Img4 from './../assets/world/zanzu/img04.png'
import Img5 from './../assets/world/zanzu/img05.png'


// import required modules
import { Navigation } from "swiper";
export default function ZanzuSwiper({ getSwiperIndex }: any ) {
    const swiperList = [Img1, Img2,Img3,Img4,Img5];
    const [activeindex, setActiveIndex] = useState(0);

  return (
    <div className={ styles.ZanzuSwiperContainer }>
      <Swiper navigation={true} pagination={ false } className="mySwiper" modules={[Navigation]} onSlideChange={(swiperInst) => {
          setActiveIndex(swiperInst.activeIndex)
          getSwiperIndex(swiperInst.activeIndex)
        }}
      onSwiper={(swiper) => console.log(swiper)}>
          {
              swiperList.length && swiperList.map((item, index) => {
                  return (<SwiperSlide key={ index }>
                    <img className={ styles.swiperImg } src={ item } alt=""/>
                </SwiperSlide>)
              })
          }
      </Swiper>
      <div className={ styles.myPagnation }>
          {
              swiperList.length && swiperList.map((item, index) => {
                return <div key={ index } className={ activeindex === index ? styles.bulletItemAct : styles.bulletItem }></div>
              })
          }
          
      </div>
    </div>
  );
}