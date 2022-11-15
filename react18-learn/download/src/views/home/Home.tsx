import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import  styles from  './Home.module.scss'
import Img1 from './../../assets/img/01.png'

export default function HomePage() {
    return (
        <div className={ styles.homeContainer }>
            <div className={ styles.centerSwiper }>
                <Swiper
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                style={{ width: '100%',height:'100%' }}
                >
                    <SwiperSlide>
                        <img className={ styles.swiperImg } src={ Img1 } alt=""/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}
