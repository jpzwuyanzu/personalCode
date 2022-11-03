import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux-hook'
import { switchTabBar } from '../../store/tabbar.slice'
import { useParams, useNavigate } from 'react-router-dom'
import { NavBar,Button, Image  } from 'antd-mobile'
import styles from './Detail.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function Detail() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

    useEffect(() => {
        dispatch(switchTabBar({ status: false }))
        return () => {
          dispatch(switchTabBar({ status: true }))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className={ styles.film_detail_container }>
             <div className={ styles.top_navBar }>
                <NavBar onBack={() => navigate('/')}></NavBar>
             </div>
             <div className={ styles.center_content }>
                 <div className={ styles.top_poster_cntainer }>
                    <Image lazy width="100%" height="100%" fit='fill' src="https://pic.maizuo.com/usr/movie/47ea256514ce764ff4b1d75fa9186424.jpg" />
                 </div>
                 <div className={ styles.film_desc_detail }>
                     <div className={ styles.title_line }>
                         <div className={ styles.title_label }>万里归途<span>2D</span></div>
                         <div className={ styles.film_score }>7.3分</div>
                     </div>
                     <div className={ styles.detail_item }>剧情｜战争</div>
                     <div className={ styles.detail_item }>2022-09-30上映</div>
                     <div className={ styles.detail_item }>中国大陆｜137分钟</div>
                     <div className={ styles.detail_item }>剧情｜战争</div>
                     <div className={ styles.detail_item }>
                         电影根据真实事件改编。 努米亚共和国爆发战乱，
                         前驻地外交官宗大伟（张译 饰）与外交部新人成朗（王俊凯 饰）受命前往协助撤侨。
                         任务顺利结束，却得知还有一批被困同胞，正在白婳（殷桃 饰）的带领下，
                         前往边境撤离点。情急之下，两人放弃了回家机会，逆行进入战区。
                         赤手空拳的外交官，穿越战火和荒漠，面对反叛军的枪口，如何带领同胞走出一条回家之路……
                    </div>
                 </div>
                 <div className="actor_list" style={{ paddingLeft: '20px' }}>
                 <Swiper
                    spaceBetween={8}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    <SwiperSlide>
                        <div style={{ width: '100px', height: '100px',background:'red' }}>12</div>
                    </SwiperSlide>
                    <SwiperSlide><div style={{ width: '100px', height: '100px',background: 'green' }}>333</div></SwiperSlide>
                    <SwiperSlide><div style={{ width: '100px', height: '100px',background: 'yellow' }}>444</div></SwiperSlide>
                    <SwiperSlide><div style={{ width: '100px', height: '100px',background: 'orange' }}>555</div></SwiperSlide>
                    </Swiper>
                 </div>
             </div>
             <div className={ styles.bottom_buy_btn }>
                <Button block color='primary' size='middle' style={{ '--border-radius': 'none', fontSize: '14px' }}>
                 选座购票
                </Button>
             </div>
        </div>
    )
}
