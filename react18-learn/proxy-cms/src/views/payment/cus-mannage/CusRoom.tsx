import React, { useEffect, useState } from 'react'
import { Empty } from 'antd'
import ChatRoom from '@/components/ChatRoom/ChatRoom'
import { loadCusList } from '@/api/index'
import styles from './CusRoom.module.scss'

export default function CusRoom() {

  const [isHasConcat, setIsHasConcat] = useState(false);

  const loadLeftCusList = async() => {
    const res: any = await loadCusList({})
    if(res && res.code === 200) {
      setIsHasConcat(res.data.chat.length ? true : false)
    }
  }

  useEffect(() => {
    loadLeftCusList()
  }, [])

  return (
    <div className={ styles.chatPage_container }>
      {
        isHasConcat ? <ChatRoom/> : <div className={ styles.emptyContainer }><Empty/></div>
      }
    </div>
  )
}
