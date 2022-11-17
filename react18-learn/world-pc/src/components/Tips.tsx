import React from 'react'
import styles from './Tips.module.scss'

export default function Tips({ content }: any) {
    return (
        <div className={ styles.tips_container }>
            { content }
        </div>
    )
}
