import React from 'react'
import { NavBar, Space, Toast } from 'antd-mobile'

const ProxyIndex = () =>  {
  const back = () => {
    console.log('909090')
  }
  return (
    <div className='proxy_container'>
      <NavBar onBack={back}>标题</NavBar>
    </div>
  )
}


export default ProxyIndex