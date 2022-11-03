import { Swiper } from 'antd-mobile'
import styles from './SwiperCom.module.scss'

export default function SwiperCom() {
    const colors = ['#11a4fc', '#24b526', '#a3ed1e', '#f17b25']
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
