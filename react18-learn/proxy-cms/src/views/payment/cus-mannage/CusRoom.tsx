import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import ChatRoom from '@/components/ChatRoom/ChatRoom'
import styles from './CusRoom.module.scss'

export default function CusRoom() {
  return (
    <div className={ styles.chatPage_container }>
        <ChatRoom/>
    </div>
  )
}
