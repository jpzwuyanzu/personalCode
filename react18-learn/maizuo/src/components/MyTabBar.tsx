import React from 'react'
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
  } from 'antd-mobile-icons'

export default function MyTabBar() {
    const tabs = [
        {
          key: '/home',
          title: '电影',
          icon: <AppOutline />,
        },
        {
          key: '/todo',
          title: '影院',
          icon: <UnorderedListOutline />,
        },
        {
          key: '/message',
          title: '资讯',
          icon: <MessageOutline />,
        },
        {
          key: '/me',
          title: '我的',
          icon: <UserOutline />,
        },
      ]
    return (
        <>
            <TabBar activeKey={'/#/films/NowPlaying'}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </>
    )
}
