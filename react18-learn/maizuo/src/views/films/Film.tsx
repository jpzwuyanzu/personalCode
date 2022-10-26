import { Outlet, useNavigate } from 'react-router-dom'
import SwiperCom from '../../components/SwiperCom';
import { Tabs } from 'antd-mobile'
import BetterScroll from 'better-scroll'
import styles from './film.module.scss'


export default function Film() {
    const navigate = useNavigate();
    const handlerChange = (key: string) => {
        navigate(key)
    }
    return (
        <>
            <SwiperCom/>
            <Tabs onChange={ handlerChange }>
                <Tabs.Tab className={ styles.myTopTab } title='正在热映' key='/films/NowPlaying'></Tabs.Tab>
                <Tabs.Tab className={ styles.myTopTab } title='即将上映' key='/films/ComingSoon'></Tabs.Tab>
            </Tabs>
            <Outlet/>
        </>
    )
}
