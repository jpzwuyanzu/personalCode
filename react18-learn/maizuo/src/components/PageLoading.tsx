import React from 'react'
import { SpinLoading } from 'antd-mobile'
import styles from './PageLoading.module.scss'

export default function PageLoading() {
    return (
        <div className={ styles.loading_container }>
            <SpinLoading color="#ff5f16" style={{ '--size': '48px' }}/>
        </div>
    )
}
