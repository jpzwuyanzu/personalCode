import React from 'react'
import styles from '@/views/home/Home.module.scss'
import testImg from '@/assets/imgs/top.png'
import {REACT_APP_API_URL} from '../../config/config'
export default function HomePage() {
  console.log(REACT_APP_API_URL)
  return (
    <div className={styles.homePage_container}>
      <img className={ styles.test } src={ testImg } alt=""/>
    </div>
  )
}
