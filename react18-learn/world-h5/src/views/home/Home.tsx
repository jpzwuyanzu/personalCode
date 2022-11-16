import React, { useState } from "react";
import "swiper/css";
import styles from "./Home.module.scss";
import ZanzuSwiper from "../../components/ZanzuSwiper";
import ShowSwiper from "../../components/ShowSwiper";
import hdImg from './../../assets/world/hd/hd-detail.png'
import aboutImg from './../../assets/world/about/about-detail.png'
import contentImg from './../../assets/world/about/content.png'


export default function HomePage() {
  const [chooseBtn, setChooseBtn] = useState<number>(0);
  const [zanzuSwiperIndex, setZanzuSwiperIndex] = useState<number>(0);
  const [showSwiperIndex, setShowSwiperIndex] = useState<number>(0);
  const getZanZuSwiperIndex = (index: number) => {
      setZanzuSwiperIndex(index)
  }
  const getShowSwiperIndex = (index: number) => {
    setShowSwiperIndex(index)
  } 

  const openNewLink = (url: string) => {
      window.open(url, '_blank')
  }

  

  return (
    <div className={styles.homeContainer}>
      <div className={styles.rightCustomer} onClick={ () => openNewLink('https://g6.halan6.live') }></div>
      <div className={styles.centerPart}>
        <div className={styles.tabPart}>
          <div
            className={chooseBtn === 0 ? styles.zuItemAct : styles.zuItem}
            onClick={() => setChooseBtn(0)}
          ></div>
          <div
            className={chooseBtn === 1 ? styles.hdItemAct : styles.hdItem}
            onClick={() => setChooseBtn(1)}
          ></div>
          <div
            className={chooseBtn === 2 ? styles.showItemAct : styles.showItem}
            onClick={() => setChooseBtn(2)}
          ></div>
          <div
            className={chooseBtn === 3 ? styles.aboutItemAct : styles.aboutItem}
            onClick={() => setChooseBtn(3)}
          ></div>
        </div>
        {
            chooseBtn !== 3 && (<>
            <div className={styles.title_label}>{ chooseBtn === 0 ?  '合作伙伴' : (chooseBtn === 1 ? '独家优惠' : (chooseBtn === 2 ? '支持多种玩法' : '')) }</div>
        <div className={styles.swiper_title}>
          <div className={ chooseBtn === 0 ? styles.title_ccon : styles.otherTitleCon }>
            {chooseBtn === 0 ? "bob＆博鱼平台目前已赞助多特蒙德等球队，并邀请到了菲利波-因扎吉等国际足球明星作为品牌代言人" : (chooseBtn === 1 ? "哈兰-BOB-博鱼量身定做优惠套餐" : ((chooseBtn === 2 && showSwiperIndex === 1) ? "全面覆盖各项体育赛事" : "丰富多彩的盘口玩法和业内最高的投注比例"))}
          </div>
        </div>
        {chooseBtn === 0 && (
          <>
            <div className={styles.centerSwiper}>
              <ZanzuSwiper getSwiperIndex={ getZanZuSwiperIndex } />
            </div>
            <div className={styles.swip_cont_container}>
              <div className={styles.swiper_img_content}>
                  {
                      zanzuSwiperIndex === 0 ? `携手共进，共创辉煌。专于优秀，精于品牌的BOB体育集团与法甲里昂（Olympique Lyonnais）
                      足球俱乐部签订合作伙伴关系协议。BOB体育成为里昂俱乐部在亚洲地区官方独家投注合作伙伴。
                      本次合作拉开了BOB体育迈向国际市场的序幕，是BOB体育秉承公平、公正的体育宗旨，
                      以更好的服务体验为竞争力，为广大球迷提供高端、一流的投注产品。` : `2019年5月，BOB体育平台和德甲多特蒙德俱乐部达成战略合作，本次合作是BOB体育迈向国际化
                      的一大步，也是年轻的BOB体育平台与老牌德甲豪门的一次激情合作。我们的合作目标是提高BOB体
                      育品牌效应并在全球范围内推广德甲联赛。当一支新锐力量致力于打造一流产品、与顶尖合作伙伴、
                      塑造杰出品牌形象，它已准备好向上攀升，主宰未来。相信双方此次的合作定会
                      让彼此的前途更加坦荡无阻、一片光明。`
                      
                  }
                
              </div>
            </div>
          </>
        )}
        {chooseBtn === 2 && (
          <>
            <div className={styles.showCenterSwiper}>
                <ShowSwiper getShowSwiperIndex={ getShowSwiperIndex }/>
            </div>
          </>
        )}
            </>)
        }
        {
            chooseBtn === 1 && (<>
                <div className={ styles.hd_container }>
                    <img className={ styles.hd_dteail_img } src={ hdImg } alt=""/>
                </div>
            </>)
        }
        {
            chooseBtn === 3 && (<>
                <div className={ styles.about_container }>
                    <img className={ styles.aboutImg } src={ aboutImg } alt=""/>
                    <img className={ styles.contentImg } src={ contentImg } alt=""/>
                </div>
            </>)
        }
      </div>
      <div className={styles.download_btn_group}>
        <div className={styles.bob_btn} onClick={ () => openNewLink('http://www.bob2021.net:8301') }></div>
        <div className={styles.boyu_btn} onClick={ () => openNewLink('http://byvip321.vip') }></div>
      </div>
    </div>
  );
}
