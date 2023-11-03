import React from 'react'
import { NavBar, List, Image } from 'antd-mobile'
import styles from './home.module.scss'
const users = [
    {
      id: '1',
      avatar:
        'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      name: 'Novalee Spicer',
      description: 'Deserunt dolor ea eaque eos',
    },
    {
      id: '2',
      avatar:
        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
      name: 'Sara Koivisto',
      description: 'Animi eius expedita, explicabo',
    },
    {
      id: '3',
      avatar:
        'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      name: 'Marco Gregg',
      description: 'Ab animi cumque eveniet ex harum nam odio omnis',
    },
    {
      id: '4',
      avatar:
        'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      name: 'Edith Koenig',
      description: 'Commodi earum exercitationem id numquam vitae',
    },
    {
        id: '5',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
      {
        id: '6',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
      {
        id: '7',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
      {
        id: '8',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
      {
        id: '9',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
      {
        id: '10',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
      {
        id: '11',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
      {
        id: '12',
        avatar:
          'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Edith Koenig',
        description: 'Commodi earum exercitationem id numquam vitae',
      },
  ]

 const Home = () =>  {
    
  return (
   <div className={styles.home_container}>
   <div className={styles.page_nav}>
   <NavBar back={null}>客服</NavBar>
   </div>
    <div className={styles.page_list}>
    <List header="联系方式">
      {users.map(user => (
        <List.Item
          key={user.id}
          prefix={
            <Image
              src={user.avatar}
              style={{ borderRadius: 20 }}
              fit='cover'
              width={40}
              height={40}
            />
          }
          description={user.description}
          onClick={() => {}}
        >
          {user.name}
        </List.Item>
      ))}
    </List>
    </div>
   </div>
  )
}


export default Home