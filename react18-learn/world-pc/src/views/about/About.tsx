import React from 'react'
import styles from './About.module.scss'
import aboutImg from './../../assets/pcImg/bg05.png'

export default function About() {
    return (
        <div className={styles.about_page_container}>
            <img className={ styles.aboutImg_detail } src={ aboutImg } alt=""/>
        </div>
    )
}
