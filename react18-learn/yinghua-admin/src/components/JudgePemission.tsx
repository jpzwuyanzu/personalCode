
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface IProps {
    pageUrl?: any;
    children? : any;
    notBtn?: any;
}

// 封装按钮权限控制
 const  JudgePemission = ({children, pageUrl, notBtn}: IProps) =>  {
    const { pathname } = useLocation()
    const [btnPermiss] = useState<any>(sessionStorage.getItem('btnPermiss') ? JSON.parse(sessionStorage.getItem('btnPermiss') as any) : [])
    
    const [isShowBtn, setIsShowBtn] = useState(false)
    useEffect(() => {
        setIsShowBtn(btnPermiss.indexOf(pageUrl) !== -1 ? true : false)
    }, [pathname, btnPermiss])
  return (
   isShowBtn ?  children : (notBtn ? '暂无权限' : null)
  )
}

export default JudgePemission
