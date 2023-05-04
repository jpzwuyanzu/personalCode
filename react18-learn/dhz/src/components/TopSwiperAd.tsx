// import React, { useRef } from 'react'
import { Swiper, Toast } from 'antd-mobile'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'
import styles from './TopSwiperAd.module.scss'


const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={styles.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
))

export default function TopSwiperAd() {
    // const ref = useRef<SwiperRef>(null)
    return (
      <>
          <Swiper autoplay>{items}</Swiper>
      </>
    )
}
