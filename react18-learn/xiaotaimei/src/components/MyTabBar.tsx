import React, { useState, useEffect } from 'react'
import { TabBar } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import {
     MovieOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
  } from 'antd-mobile-icons'

export default function MyTabBar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [activeKey, setActiveKey] = useState(pathname)
    const tabs = [
        {
          key: '/films/NowPlaying',
          title: '电影',
          icon: <MovieOutline />,
        },
        {
          key: '/cinema',
          title: '影院',
          icon: <UnorderedListOutline />,
        },
        {
          key: '/news/mz-act',
          title: '资讯',
          icon: <MessageOutline />,
        },
        {
          key: '/center',
          title: '我的',
          icon: <UserOutline />,
        },
    ]
    const handlerTabChange = (key: string) => {
      navigate(key)
      setActiveKey(key)
    }
    useEffect(() => {
      if(pathname === '/films/ComingSoon' || pathname === '/films/NowPlaying' || pathname === '/') {
        setActiveKey('/films/NowPlaying')
      }
      // eslint-disable-next-line
    }, [])
    return (
        <>
            <TabBar style={{ background: 'white',borderTop: 'solid 1px var(--adm-color-border)',flex: 0 }} activeKey={activeKey} onChange={ handlerTabChange }>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </>
    )
}
