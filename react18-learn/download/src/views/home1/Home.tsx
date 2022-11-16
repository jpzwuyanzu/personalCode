import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import  styles from  './Home.module.scss'
import Img1 from './../../assets/img/01.png'
import Img2 from './../../assets/img/top.png'
import Img3 from './../../assets/img/gift.png'
import Img4 from './../../assets/img/concat-line.png'
import QqImg from './../../assets/img/qq.png'
import PaoImg from './../../assets/img/paopao.png'
import AddImg from './../../assets/img/add.png'

export default function HomePage() {
    return (
        <div className={ styles.homeContainer }>
            <div className={ styles.topHeader }>
                <img className={ styles.topImg } src={ Img2 } alt=""/>
                <div className={ styles.topTypeLine }>
                    <div className={ styles.typeItem }>体育</div>
                    <div className={ styles.typeItem }>电竞</div>
                    <div className={ styles.typeItem }>棋牌</div>
                    <div className={ styles.typeItem }>真人</div>
                    <div className={ styles.typeItem }>电子</div>
                </div>
            </div>
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
            <div className={ styles.giftImg }>
                <img className={ styles.giftDetail } src={ Img3 } alt=""/>
            </div>
            <div className={ styles.concatPart }>
                <img className={ styles.concatLabel } src={ Img4 } alt=""/>
                <div className={ styles.concatDetail }>
                    <div className={ styles.topConcatPart }>
                        <div className={ styles.lineItem }>
                            <img className={ styles.leftIcon } src={ QqImg } alt=""/>
                            <div className={ styles.centerInfo }>QQ号: <span className={ styles.concatNum }> 1879909701</span></div>
                            <div className={ styles.rightBtn }>
                                <img className={ styles.addbtn } src={ AddImg } alt=""/>
                            </div>
                        </div>
                        <div className={ styles.seperateLine }></div>
                        <div className={ styles.lineItem }>
                            <img className={ styles.leftIcon } src={ PaoImg } alt=""/>
                            <div className={ styles.centerInfo }>泡泡号: <span className={ styles.concatNum }> halan5188</span></div>
                            <div className={ styles.rightBtn }>
                                <img className={ styles.addbtn } src={ AddImg } alt=""/>
                            </div>
                        </div>
                        <div className={ styles.seperateLine }></div>
                        <div className={ styles.downloadLink }>
                            <span className={ styles.leftLabel }>下载地址: </span>
                            <a className={ styles.rightUrl } href="https://ya.cn/index.html" target="_blank" rel="noopener noreferrer">https://ya.cn/index.html</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
