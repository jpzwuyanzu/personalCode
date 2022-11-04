import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hook'
import { switchTabBar } from '../../store/tabbar.slice'
import { useParams, useNavigate } from 'react-router-dom'
import { NavBar,Button, Image  } from 'antd-mobile'
import styles from './Detail.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import axios from 'axios'
import { key } from '../../../../../learn-code/vue3-Learn/vue3-vant-ts/src/store/index';

interface IFilmDetail {
    [propName: string]: any
}

export default function Detail() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [filmDetail, setFilmDetail] = useState({} as IFilmDetail)
    const params = useParams();
    const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

    const loadFilmDetailInfo = async () => {
        const res = await axios({
            url: `https://m.maizuo.com/gateway?filmId=${params.filmId}&k=5275804`,
            headers: {
              "X-Client-Info":
                '{"a":"3000","ch":"1002","v":"5.2.1","e":"16674635654662427517976577"}',
              "X-Host": "mall.film-ticket.film.info",
            },
          });
          console.log(res.data.data.film)
          setFilmDetail({ ...res.data.data.film })
    }

    useEffect(() => {
        loadFilmDetailInfo()
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
                    <Image lazy width="100%" height="100%" fit='fill' src={ filmDetail.poster } />
                 </div>
                 <div className={ styles.film_desc_detail }>
                     <div className={ styles.title_line }>
                         <div className={ styles.title_label }>{ filmDetail.name }<span>{ filmDetail.item?.name }</span></div>
                         <div className={ styles.film_score }>{ filmDetail.grade }分</div>
                     </div>
                     <div className={ styles.detail_item }>{ filmDetail.category }</div>
                     <div className={ styles.detail_item }>{ filmDetail.premiereAt }上映</div>
                     <div className={ styles.detail_item }>{ filmDetail.nation }｜{ filmDetail.runtime }分钟</div>
                     <div className={ styles.detail_item }>{ filmDetail.category }</div>
                     <div className={ styles.detail_item }>{ filmDetail.synopsis }</div>
                 </div>
                 <div className={ styles.actor_list }>
                 <Swiper
                    spaceBetween={10} slidesPerView={3.4} onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            filmDetail.actors?.map((item: any, index: any) => {
                                return  <SwiperSlide key={ index }>
                                <Image lazy width="100%" height="400" fit='fill' src={ item.avatarAddress  } />
                                <p>{ item.name }</p>
                                <p>{ item.role }</p>
                                </SwiperSlide>
                            })
                            
                        }
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
