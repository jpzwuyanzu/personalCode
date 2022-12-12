import React from 'react'
import styles from '@/views/home/Home.module.scss'
import PcView from '../pcView/index'
import H5View from '../h5View/index'
import {judgeMobile} from '../../utils/common'
import {REACT_APP_API_URL} from '../../config/config'
// import testImg from '@/assets/imgs/top.png'
export default function HomePage() {
  console.log(REACT_APP_API_URL)
  const isMobile = judgeMobile();
  return (
    <div className={styles.homePage_container}>
      {
        isMobile ? <H5View/> : <PcView/>
      }
      {/* <img className={ styles.test } src={ testImg } alt=""/> */}
    </div>
  )
}
