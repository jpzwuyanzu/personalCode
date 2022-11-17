import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import styles from "./Default.module.scss";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tips from './../../components/Tips'
import LogoImg from "./../../assets/pcImg/logo.png";
import CustomImg from "./../../assets/pcImg/customer.png";
import RightNow from './../../assets/pcImg/rightNow.png'
import leftCode from "./../../assets/pcImg/qrcode/leftCode.png";

export default function DefaultLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<string>("/home");
  const [isShowLeftCode, setIsShowLeftCode] = useState<boolean>(false);
  const [isShowRightCode, setIsShowRightCode] = useState<boolean>(false);
  const [isShowTips ,setIsShowTips] = useState<boolean>(false);
  const changeLinkTab = (tab: string, url: string) => {
    setIsShowLeftCode(false);
    setIsShowRightCode(false);
    setActiveTab(tab);
    navigate(url, { replace: true });
  };
  const openDownLoadLink = (link: string) => {
      setIsShowLeftCode(false)
      setIsShowRightCode(false)
      window.open(link, '_blank');
  }
  const showTips = () => {
    setIsShowTips(true)
    setTimeout(() => {
      setIsShowTips(false)
    },800)
  }
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);
  return (
    <div className={styles.layoutConatiner}>
      <div className={styles.layout_header} onClick={ () => {
        setIsShowLeftCode(false);
        setIsShowRightCode(false);
      } }>
        <div className={styles.header_left}>
          <img className={styles.leftLogo} src={LogoImg} alt="" />
          <div className={styles.header_tab_part}>
            <div
              className={
                activeTab === "/home" ? styles.tab_ItemAct : styles.tab_Item
              }
              onClick={() => changeLinkTab("/home", "/home")}
            >
              首页
            </div>
            <div
              className={
                activeTab === "/zanzu" ? styles.tab_ItemAct : styles.tab_Item
              }
              onClick={() => changeLinkTab("/zanzu", "/zanzu")}
            >
              赞助
            </div>
            <div
              className={
                activeTab === "/huodong" ? styles.tab_ItemAct : styles.tab_Item
              }
              onClick={() => changeLinkTab("/huodong", "/huodong")}
            >
              活动
            </div>
            <div
              className={
                activeTab === "/show" ? styles.tab_ItemAct : styles.tab_Item
              }
              onClick={() => changeLinkTab("/show", "/show")}
            >
              展示平台
            </div>
            <div
              className={
                activeTab === "/about" ? styles.tab_ItemAct : styles.tab_Item
              }
              onClick={() => changeLinkTab("/about", "/about")}
            >
              关于我们
            </div>
          </div>
        </div>
        <div className={styles.header_right}>
          <div className={styles.rightBtn_Item}>
            <img className={styles.rightIcon} src={CustomImg} alt="" />
            <a
              className={styles.rightLink}
              href="http://g6.halan6.live"
              target="_blank"
              rel="noopener noreferrer"
            >
              联系客服
            </a>
          </div>
          <div className={styles.rightBtn_Item} style={{ marginLeft: "53px" }}>
            <img className={styles.rightIcon} src={RightNow} alt="" />
            <a
              className={styles.rightLink}
              href="http://www.baidu.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#FF695E' }}
            >
              立即参与
            </a>
          </div>
        </div>
      </div>
      <div className={styles.layout_content} onClick={ () => {
        setIsShowLeftCode(false);
        setIsShowRightCode(false);
      } }>
        <Outlet />
      </div>
      <div className={styles.layout_footer} onClick={ () => {
        setIsShowLeftCode(false);
        setIsShowRightCode(false);
      } }>
        <div
          className={styles.bobLeft_btn}
          onMouseOver={() => {
            setIsShowLeftCode(true);
            setIsShowRightCode(false);
          }}
          onClick={ () => openDownLoadLink('https://www.baidu.com') }
        >
          {isShowLeftCode && (
            <>
              <div
                className={styles.leftQrCode}
                onMouseOut={() => setIsShowLeftCode(false)}
                onClick={ (e) => e.stopPropagation() }
              >
                <div className={styles.leftCodeCon}>
                  <div className={styles.code_title}>BOB体育下载</div>
                  <img className={styles.qr_Img} src={leftCode} alt="" />
                  <div className={styles.qr_desc}>安全稳定,信赖首选</div>
                  <div className={styles.qr_Link}>
                    https://www.boyu424.com:32800/login
                  </div>
                  <CopyToClipboard text='https://www.baidu.com23231'
                    onCopy={() => showTips()}>
                    <div className={styles.copy_btnLeft}>一键复制</div>
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className={styles.boyuright_btn}
          onMouseOver={() => {
            setIsShowLeftCode(false);
            setIsShowRightCode(true);
          }}
          onClick={ () => openDownLoadLink('https://www.baidu.com') }
        >
          {isShowRightCode && (
            <>
              <div
                className={styles.rightQrCode}
                onMouseOut={() => setIsShowRightCode(false)}
                onClick={ (e) => e.stopPropagation() }
              >
                <div className={styles.rightCodeCon}>
                  <div className={styles.code_title}>BOB体育下载</div>
                  <img className={styles.qr_Img} src={leftCode} alt="" />
                  <div className={styles.qr_desc}>安全稳定,信赖首选</div>
                  <div className={styles.qr_Link}>
                    https://www.boyu424.com:32800/login
                  </div>
                  <CopyToClipboard text='https://www.baidu.com6666'
                    onCopy={() => showTips()}>
                   <div className={styles.copy_btnRight}>一键复制</div>
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
        { isShowTips && <Tips content="复制成功" />  }
    </div>
  );
}
