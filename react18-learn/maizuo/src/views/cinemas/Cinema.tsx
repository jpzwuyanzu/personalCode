import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchOutline, DownOutline } from 'antd-mobile-icons'
import { NavBar, Dropdown, List } from 'antd-mobile'
import styles from './Cinema.module.scss'
import choosedImg from './../../assets/imgs/choosed.png'
import axios from 'axios'
import PageLoading from '../../components/PageLoading'
import { useAppSelector } from './../../hooks/redux-hook'
import { SELECT_CITY_KEY } from './../../store/selectcity.slice'

export default function Cinema() {
    const navigate = useNavigate();
    const cityId = useAppSelector((state) => state[SELECT_CITY_KEY]['cityId']);
    const cityName = useAppSelector((state) => state[SELECT_CITY_KEY]['name']);
    const [activePart, setActivePart] = useState(0);
    const [activeType, setActiveType] = useState(0);
    const [activeRecent, setActiveRecent] = useState(0);
    const [cinemaList, setCinemaList] = useState([]);
    const cityPartList = ['全城','福田区','南山区','龙华区','龙岗区','宝安区','罗湖区','光明区','盐田区','坪山区','大鹏区'];
    const tickedType = [{id: 1, text: 'APP订票'},{ id: 2, text: '前台兑换' }];
    const recentPlace = [{ id: 0, text: '最近去过' }, { id: 1, text: '离我最近' }];
    const  dropDownPartRef: any = useRef(null);
    const rightPart = (<SearchOutline style={{ fontSize: 18 }} onClick={ () => navigate('/cinema/search') }/>)
    const leftPart = (
        <div className={ styles.leftPart } onClick={ () => navigate('/city') }>
            { cityName }
            <DownOutline style={{ marginLeft: '2px' }} />
        </div>
    )
    const loadCinemaList = async () => {
        const res = await axios({
            url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=${tickedType[activeType].id}&k=7249404`,
            headers: {
              "X-Client-Info":
                `{"a":"3000","ch":"1002","v":"5.2.1","e":"16558863921792667809742849","bc": "${cityId}"}`,
              "X-Host": "mall.film-ticket.cinema.list",
            },
          });
          setCinemaList(res.data.data.cinemas)
    }
    useEffect(() => {
        loadCinemaList()
    }, [])

    return (
        <>
        <NavBar left={ leftPart } right={rightPart} back={ null }>影院</NavBar>
        <div className={ styles.topFilterPart }>
            <div className={ styles.filterItem }>
                <Dropdown ref={ dropDownPartRef }>
                    <Dropdown.Item key='sorter' title={ cityPartList[activePart] } arrow={ <DownOutline style={{ color: '#000' }} /> }>
                        <div className={ styles.cityPart }>
                            {
                                cityPartList.map((item, index) => {
                                    return <div key={index} className={ activePart === index ? styles.activeCityPart :  styles.partItem } onClick={ () => {
                                        setActivePart(index)
                                        dropDownPartRef.current?.close()
                                    } }>{ item }</div>
                                })
                            }
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item key='type' title={ tickedType[activeType].text } arrow={ <DownOutline style={{ color: '#000' }} /> }>
                       <div className={ styles.line_container }>
                           {
                               tickedType.map((item, index) => {
                               return <div key={ index } className={ styles.line_item } onClick={ () => {
                                    setActiveType(index);
                                    dropDownPartRef.current?.close()
                                    loadCinemaList()
                               } }>
                                    { activeType === index && <img className={ styles.choose_icon } src={ choosedImg } alt=""/> }
                                    <div className={ activeType === index ? styles.active_text :  styles.item_text }>{ item.text }</div>
                                </div>
                               })
                           }
                            
                       </div>
                    </Dropdown.Item>
                    <Dropdown.Item key='recent' title={ recentPlace[activeRecent].text } arrow={ <DownOutline style={{ color: '#000' }} /> }>
                    <div className={ styles.line_container }>
                           {
                               recentPlace.map((item, index) => {
                               return <div key={ index } className={ styles.line_item } onClick={ () => {
                                setActiveRecent(index);
                                dropDownPartRef.current?.close()
                           } }>
                                    { activeRecent === index && <img className={ styles.choose_icon } src={ choosedImg } alt=""/> }
                                    <div className={ activeRecent === index ? styles.active_text :  styles.item_text }>{ item.text }</div>
                                </div>
                               })
                           }
                            
                       </div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
         <div className={ styles.cinema_List_container }>
             {
                 !cinemaList.length ? <PageLoading/> : <List>
                 { cinemaList.map((item:any) => {
                     return <List.Item  key={item.name}
                     description={
                     <div className={ styles.cinema_message }>
                        <div className={ styles.adress }>{item.address}</div>
                        <div>距离未知</div>
                     </div>
                    }>
                     <>
                     <div className={ styles.cinema_name_info_line }>
                        <div className={ styles.name }>{ item.name }</div>
                        <div className={ styles.price }><span>¥ </span>{ item.lowPrice/100 }<span>起</span></div>
                      </div>
                     </>
                     </List.Item>
                 }) }
                 </List>
             }
         </div>
        
        </>
    )
}
