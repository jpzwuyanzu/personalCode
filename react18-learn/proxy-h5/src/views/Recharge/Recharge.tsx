/* eslint-disable */
import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { NavBar, Image, ImageViewer } from "antd-mobile";
import { Toast } from 'react-vant'
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./Recharge.module.scss";
import copyImg from './../../assets/copy.png'


interface IProps {
  amount:any
  reTypeP:any
  accTypeP:any
  reNameP:any
  reAccountP:any
  reBankNameP:any
}


const Recharge = ({reTypeP, accTypeP,reNameP, reAccountP, reBankNameP, amount, rePayImageP}:any) => {
  console.log(reNameP, reAccountP, reBankNameP)
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [imgPreVisiable, setImgPreVisiable] = useState(false);
  //reType: 0: 代表支付宝 1:代表微信 2：代表银行卡
  const [reType, setReType] = useState(Number(reTypeP));
  //accType: 0: 代表二维码 1: 代表账号
  const [accType, setAccType] = useState(Number(accTypeP));
  // 名称， 账号， 卡号
  const [reName, setReName] = useState<any>(reNameP ? reNameP : '');
  const [reAccount, setReAccount] = useState<any>(reAccountP ? reAccountP : '');
  const [reBankName, setReBankName] = useState<any>(reBankNameP ? reBankNameP : '');
  const [rePayImage, setRePayImage] = useState<any>(rePayImageP ? rePayImageP : '');

  const handleCopy = () => {
    Toast.success('复制成功')
  };

  const handleLinkCus = () => {
    if ((window as any).WebLocalBridge) {
      (window as any).WebLocalBridge.cusTomerLink();
    } else if ((window as any).webkit?.messageHandlers) {
      (window as any).webkit.messageHandlers.JsToOc.postMessage('cusTomerLink');
    }
  }

  return (
    <div className={styles.recharge_container}>
      {/* <div className={styles.re_nav_container}>
        <NavBar onBack={() => navigate(-1)}>付款</NavBar>
      </div> */}
      <div className={styles.re_content_area}>
        <div className={styles.re_header}>
          <div className={styles.re_label}>
            当前使用{reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
            付款
          </div>
          <div className={styles.re_amount}>¥ {(Number(amount)/100).toFixed(2)}</div>
        </div>
        {/*这里要区分是账号支付还是二维码支付， 微信支付宝支持二维码， 支付宝和银行支持账号支付 */}
        <div className={styles.re_account_part}>
          {accType === 0 ? (
            <div className={styles.re_qr_type}>
              <div className={styles.re_tips}>
                截图保存图片到相册，
                {reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
                扫码付款
              </div>
              <div className={styles.re_qr_img}>
                <Image
                  src={rePayImage}
                  width={"100%"}
                  height={"100%"}
                  onClick={() => setImgPreVisiable(true)}
                />
                <ImageViewer
                  image={rePayImage}
                  visible={imgPreVisiable}
                  onClose={() => {
                    setImgPreVisiable(false);
                  }}
                />
              </div>
              {
                reType === 0 &&  <>
                <div className={styles.qr_account_name}>支付宝姓名：{reName}</div>
                <div className={styles.qr_account_name} style={{ marginTop: '10px' }}>支付宝账号：{reAccountP}</div>
                </>
              }
            </div>
          ) : (
            <div className={styles.re_account_type}>
              <div className={styles.account_tips}>
                复制
                {reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
                账号， 转账付款
              </div>
              <div className={styles.re_account_area}>
                <div className={styles.account_item}>
                  <div className={styles.acc_label}>
                    {reType === 0 ? "支付宝姓名:" : reType === 1 ? "微信" : "账户姓名:"}
                  </div>
                  <div className={styles.acc_num}>{reName}</div>
                  <CopyToClipboard text={reName} onCopy={handleCopy}>
                    <div className={styles.copyOrderNow}>
                      <img src={ copyImg } className={ styles.copyNowImg } alt="" />
                    </div>
                  </CopyToClipboard>
                </div>
                <div className={styles.account_item}>
                  <div className={styles.acc_label}>
                    {reType === 0 ? "支付宝账" : reType === 1 ? "微信" : "银行卡"}
                    号:
                  </div>
                  <div className={styles.acc_num}>{reAccount}</div>
                  <CopyToClipboard text={reAccount} onCopy={handleCopy}>
                    <div className={styles.copyOrderNow}>
                    <img src={ copyImg } className={ styles.copyNowImg } alt="" />
                    </div>
                  </CopyToClipboard>
                </div>
                {reType === 2 ? (
                  <div className={styles.account_item}>
                    <div className={styles.acc_label}>银行名称:</div>
                    <div className={styles.acc_num}>{reBankName}</div>
                    <CopyToClipboard text={reBankName} onCopy={handleCopy}>
                      <div className={styles.copyOrderNow}>
                      <img src={ copyImg } className={ styles.copyNowImg } alt="" />
                      </div>
                    </CopyToClipboard>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
        {/*这里要区分是账号支付还是二维码支付， 微信支付宝支持二维码， 支付宝和银行支持账号支付 */}
        {/* 温馨提示 */}
        <div className={styles.best_tips}>
          <div className={styles.tips_item}>温馨提示：</div>
          <div className={styles.tips_item}>
            1.该充值信息，
            <span style={{ color: "#ff0f1d" }}>仅限本次充值订单有效</span>
            ,切勿重复使用
          </div>
          <div className={styles.tips_item}>
            2.支付完成后，请上传截图提供给代理核实后为您完成充值
          </div>
          <div className={styles.tips_item}>
            3.支付如遇问题，请及时联系代理或者{" "}
            <span style={{ color: "#1677ff" }} onClick={() => handleLinkCus()} >官方客服</span>
          </div>
        </div>
        {/* 温馨提示 */}
      </div>
    </div>
  );
};

export default Recharge;
