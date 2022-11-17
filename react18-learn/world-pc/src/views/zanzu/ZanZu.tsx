import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import styles from "./ZanZu.module.scss";
import big01 from "./../../assets/pcImg/zanzu/big/01.png";
import big02 from "./../../assets/pcImg/zanzu/big/02.png";
import big03 from "./../../assets/pcImg/zanzu/big/03.png";
import big04 from "./../../assets/pcImg/zanzu/big/04.png";
import big05 from "./../../assets/pcImg/zanzu/big/05.png";
import big06 from "./../../assets/pcImg/zanzu/big/06.png";
import smImg1 from "./../../assets/pcImg/zanzu/small/01.png";
import smImg2 from "./../../assets/pcImg/zanzu/small/02.png";
import smImg3 from "./../../assets/pcImg/zanzu/small/03.png";
import smImg4 from "./../../assets/pcImg/zanzu/small/04.png";
import smImg5 from "./../../assets/pcImg/zanzu/small/05.png";
import smImg6 from "./../../assets/pcImg/zanzu/small/06.png";

export default function ZanZu() {
  const bigImgSource = [big01, big02, big03, big04, big05, big06];
  const smallImgSource = [smImg1, smImg2, smImg3, smImg4, smImg5, smImg6];
  const [activeSwiperIndex, setActiveSwiperIndex] = useState<number>(0);
  const [swiperIns, setSwiperIns] = useState<any>(null);
  const handleSmallImgChoose = (index: number) => {
    if (swiperIns) {
      swiperIns.slideTo(index);
      setActiveSwiperIndex(index);
    }
  };

  return (
    <div
      className={styles[`zanzu_page_container${activeSwiperIndex}`]}
      style={{ width: "100%", height: "calc(100% - 165px)",overflowY: 'scroll',paddingBottom: '165px' }}
    >
      <div className={styles.zanzu_swiper_container}>
        <Swiper
        pagination={ false }
          onSlideChange={(swiperRef) => setActiveSwiperIndex(swiperRef.activeIndex)}
          onSwiper={(swiper) => setSwiperIns(swiper)}
        >
          {bigImgSource.length &&
            bigImgSource.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={item}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div className={styles.zanzu_swiper_line}>
        {smallImgSource.length &&
          smallImgSource.map((item, index) => {
            return (
              <div
                key={index}
                className={activeSwiperIndex === index ? styles.znazu_swiper_itemAct : styles.znazu_swiper_item}
                onClick={() => handleSmallImgChoose(index)}
              >
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={item}
                  alt=""
                />
              </div>
            );
          })}
      </div>
      <div className={styles.zanzu_swiper_info}>
          <div className={ styles.swiper_info_content }>
          {
              activeSwiperIndex === 0 && `2021年6月3日，BOB体育平台与威尔士国家足球队在卡迪夫正式签约，达成深度战略合作。
              作为世界上最古老的足球协会之一，威尔士国家足球队发现人才、培养冠军、见证传奇，而此次签约则是年轻的BOB跻身世界一流的崛起见证。
              经典的体育赛事，经典的品牌形象，两者结合是BOB不断创新，追求荣誉与梦想的有力表达。相信双方牵手必将共同迈向更高的台阶，
              抓住未来的每一次机遇，战胜未来的每一次挑战。`
          }
          {
              activeSwiperIndex === 1 && `2019年5月，BOB体育平台和德甲多特蒙德俱乐部达成战略合作，本次合作是BOB体育迈向国际化的一大步，
              也是年轻的BOB体育平台与老牌德甲豪门的一次激情合作。我们的合作目标是提高BOB体育品牌效应并在全球范围内推广德甲联赛。
              当一支新锐力量致力于打造一流产品、与顶尖合作伙伴、塑造杰出品牌形象，它已准备好向上攀升，主宰未来。
              相信双方此次的合作定会让彼此的前途更加坦荡无阻、一片光明。`
          }
          {
              activeSwiperIndex === 2 && `2019年5月，BOB体育平台签约菲利波·因扎吉为形象代言人并召开新闻发布会。
              此次与菲利波·因扎吉的合作，是BOB体育一个全新时代的开端。秉承着“只与优秀合作，提供优质服务”的经营理念，BOB体育将继续为广大
              体育爱好者提供更多更丰富游戏种类，
              以及更完善的游戏体验。`
          }
          {
              activeSwiperIndex === 3 && `携手共进，共创辉煌。专于优秀，精于品牌的BOB体育集团与法甲里昂（Olympique Lyonnais）足球俱乐部签订合作伙伴关系协议。
              BOB体育成为里昂俱乐部在亚洲地区官方独家投注合作伙伴。
              本次合作拉开了BOB体育迈向国际市场的序幕，是BOB体育秉承公平、公正的体育宗旨，
              以更好的服务体验为竞争力，为广大球迷提供高端、一流的投注产品。`
          }
          {
              activeSwiperIndex === 4 && `那不勒斯足球俱乐部位于意大利南部著名城市那不勒斯，成立于1904年，1964年时改为SSC Napoli。俱乐部的主色调为地中海的蓝色，
              主体育场为启用于1959年的圣保罗体育场。那不勒斯俱乐部历史上最辉煌的年代属于球王马拉多纳，马拉多纳是那不勒斯的象征和不灭的神话，
              可以说是马拉多纳让世人认识了那不勒斯这支球队。本赛季，BOB体育平台以赞助商的的身份联手那不勒斯俱乐部，
              将给为俱乐部增添新的助力，推动那不勒斯的持续发展，在马拉多纳的基础上，让亚洲乃至世界重新见证那不勒斯的辉煌。`
          }
          {
              activeSwiperIndex === 5 && `2021年6月3日，BOB体育平台与荷兰国家足球队在卡迪夫正式签约，达成深度战略合作。
              作为世界上最古老的足球协会之一，    荷兰国家足球队发现人才、培养冠军、见证传奇，而此次签约则是年轻的BOB跻身世界一流的崛起见证。
              经典的体育赛事，经典的品牌形象，两者结合是BOB不断创新，追求荣誉与梦想的有力表达。相信双方牵手必将共同迈向更高的台阶，
              抓住未来的每一次机遇，战胜未来的每一次挑战。`
          }
          </div>
          <div className={ styles.swiper_pag_container }>
              {
                  bigImgSource.length && bigImgSource.map((item, index) => {
                      return(
                        <div key={ index } className={activeSwiperIndex === index ?  styles.pagnation_itemAct : styles.pagnation_item }></div>
                      )
                  })
              }
          </div>
      </div>
    </div>
  );
}
