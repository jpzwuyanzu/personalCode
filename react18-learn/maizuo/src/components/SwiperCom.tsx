import { Swiper } from 'antd-mobile'
import styles from './SwiperCom.module.scss'

export default function SwiperCom() {
    const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
    const items = colors.map((color, index) => (
    <Swiper.Item key={index}  onClick={() => {
        console.log(`你点击了卡片 ${index + 1}`)
    }}>
        <div
        className={styles.content}
        style={{ background: color }}
       
        >
        {index + 1}
        </div>
    </Swiper.Item>
    ))
    return (
        <>
         <Swiper>{items}</Swiper>
        </>
    )
}
