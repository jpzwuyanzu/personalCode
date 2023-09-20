import { useEffect, useState } from 'react'
import { Empty } from 'antd'
import ChatRoom from '@/components/ChatRoom/ChatRoom'
import { loadCusList } from '@/api/index'
import { useAppSelector, useAppDispatch }  from '@/hooks/hooks'
import { switchUnreadNum } from '@/store/slices/message.slice'
import styles from './CusRoom.module.scss'

export default function CusRoom() {

  const [isHasConcat, setIsHasConcat] = useState(false);
  const refreshNow = useAppSelector((state) => state.unreadNum.isRefreshCus);
  const dispatch = useAppDispatch();

  const loadLeftCusList = async() => {
    const res: any = await loadCusList({})
    if(res && res.code === 200) {
      setIsHasConcat(res.data.chat.length ? true : false)
      dispatch(switchUnreadNum({ 'ac': 'fresh', value: false} as any))
    }
  }

  useEffect(() => {
    if(!isHasConcat) loadLeftCusList()
  }, [refreshNow])

  return (
    <div className={ styles.chatPage_container }>
      {
        isHasConcat ? <ChatRoom/> : <div className={ styles.emptyContainer }><Empty/></div>
      }
    </div>
  )
}
