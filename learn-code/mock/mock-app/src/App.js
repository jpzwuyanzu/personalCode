import React, { useEffect } from 'react'
import axios from 'axios'

export default function App() {
  useEffect(() => {
    axios.get('http://www.xiaohuozi.top/api/pro/list').then(res => {
      console.log(res.data.data)
    })
  }, [])
  return (
    <div>
      mockjs
    </div>
  )
}
