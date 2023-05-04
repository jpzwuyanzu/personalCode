import React from 'react'
import TabSwiperCom from '../../components/TabSwiperCom'
import TopSwiperAd from '../../components/TopSwiperAd'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.home_page_container}>
       <div className={styles.top_ad_part}></div>
        <div className={styles.top_tab_part}>
            <TopSwiperAd/>
        </div>
        <div className={styles.middle_swiper_part}>
            <TabSwiperCom/>
            {/* <div className={styles.swiper_label_item}>加藤视频</div>
            <div className={styles.swiper_label_item}>加藤视频</div>
            <div className={styles.swiper_label_item}>加藤视频</div>
            <div className={styles.swiper_label_item}>加藤视频</div>
            <div className={styles.swiper_label_item}>加藤视频</div>
            <div className={styles.swiper_label_item}>加藤视频</div>
            <div className={styles.swiper_label_item}>加藤视频</div> */}
        </div>
        <div className='bottom_part'></div>
    </div>
  )
}
