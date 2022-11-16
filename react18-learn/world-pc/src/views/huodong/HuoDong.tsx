import React from 'react'
import styles from './HuoDong.module.scss'
import activityImg from './../../assets/pcImg/activityImg.png'

export default function HouDong() {
    return (
        <div className={ styles.huodong_page_container }>
             <div className={ styles.top_title_line }>
            哈兰-BOB-博鱼量身定做优惠套餐
           </div>
           <div className={styles.activity_detail}></div>
           {/* <img className={ styles.activity_detail } src={ activityImg } alt=""/> */}
        </div>
    )
}
