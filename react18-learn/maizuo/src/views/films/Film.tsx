import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import SwiperCom from '../../components/SwiperCom';
import { Tabs } from 'antd-mobile';
import styles from './film.module.scss';


export default function Film() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const handlerChange = (key: string) => {
        navigate(key)
    }

    return (
        <>
            <SwiperCom/>
            <Tabs activeKey={ pathname } onChange={ handlerChange }>
                <Tabs.Tab className={ styles.myTopTab } title='正在热映' key='/films/NowPlaying'></Tabs.Tab>
                <Tabs.Tab className={ styles.myTopTab } title='即将上映' key='/films/ComingSoon'></Tabs.Tab>
            </Tabs>
            <Outlet/>
        </>
    )
}
