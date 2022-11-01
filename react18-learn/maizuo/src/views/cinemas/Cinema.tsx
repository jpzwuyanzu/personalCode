import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchOutline, DownOutline } from 'antd-mobile-icons'
import { NavBar, Dropdown } from 'antd-mobile'
import styles from './Cinema.module.scss'

export default function Cinema() {
    const navigate = useNavigate();
    const cityPartList = ['全城','福田区','南山区','龙华区','龙岗区','宝安区','罗湖区','光明区','盐田区','坪山区','大鹏区'];
    const [activePart, setActivePart] = useState(0)
    const  dropDownRef: any = useRef(null);
    const rightPart = (<SearchOutline style={{ fontSize: 18 }} onClick={ () => navigate('/cinema/search') }/>)
    const leftPart = (
        <div className={ styles.leftPart } onClick={ () => navigate('/city') }>
            深圳
            <DownOutline style={{ marginLeft: '2px' }} />
        </div>
    ) 
    return (
        <>
        <NavBar left={ leftPart } right={rightPart} back={ null }>影院</NavBar>
        <div className={ styles.topFilterPart }>
            <div className={ styles.filterItem }>
                <Dropdown ref={ dropDownRef }>
                    <Dropdown.Item key='sorter' title={ cityPartList[activePart] } arrow={ <DownOutline style={{ color: '#000' }} /> }>
                        <div className={ styles.cityPart }>
                            {
                                cityPartList.map((item, index) => {
                                    return <div key={index} className={ activePart === index ? styles.activeCityPart :  styles.partItem } onClick={ () => {
                                        setActivePart(index)
                                        dropDownRef.current?.close()
                                    } }>{ item }</div>
                                })
                            }
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div className={ styles.filterItem }>
                <Dropdown>
                    <Dropdown.Item key='sorter' title='APP订票' arrow={ <DownOutline style={{ color: '#000' }} /> }>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div className={ styles.filterItem }>
                <Dropdown>
                    <Dropdown.Item key='sorter' title='最近去过' arrow={ <DownOutline style={{ color: '#000' }} /> }>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
        </>
    )
}
