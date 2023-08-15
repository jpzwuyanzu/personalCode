import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Image, ImageViewer, Toast } from "antd-mobile";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./Recharge.module.scss";

const Recharge = () => {
  const navigate = useNavigate();
  const [imgPreVisiable, setImgPreVisiable] = useState(false);
  //reType: 0: 代表支付宝 1:代表微信 2：代表银行卡
  const [reType, setReType] = useState(2);
  //accType: 0: 代表二维码 1: 代表账号
  const [accType, setAccType] = useState(1);
  // 名称， 账号， 卡号
  const [reName, setReName] = useState("张三");
  const [reAccount, setReAccount] = useState("23434234234234");
  const [reBankName, setReBankName] = useState("工商银行");

  const handleCopy = () => {
    Toast.show({ content: "复制成功", position: "top" });
  };

  return (
    <div className={styles.recharge_container}>
      <div className={styles.re_nav_container}>
        <NavBar onBack={() => navigate(-1)}>付款</NavBar>
      </div>
      <div className={styles.re_content_area}>
        <div className={styles.re_header}>
          <div className={styles.re_label}>
            当前使用{reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
            付款
          </div>
          <div className={styles.re_amount}>¥ 1000.00</div>
        </div>
        {/*这里要区分是账号支付还是二维码支付， 微信支付宝支持二维码， 支付宝和银行支持账号支付 */}
        <div className={styles.re_account_part}>
          {accType === 0 ? (
            <div className={styles.re_qr_type}>
              <div className={styles.re_tips}>
                保存图片到相册，
                {reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
                扫码付款
              </div>
              <div className={styles.re_qr_img}>
                <Image
                  src={
                    "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
                  }
                  width={"100%"}
                  height={"100%"}
                  onClick={() => setImgPreVisiable(true)}
                />
                <ImageViewer
                  image={
                    "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
                  }
                  visible={imgPreVisiable}
                  onClose={() => {
                    setImgPreVisiable(false);
                  }}
                />
              </div>
              <div className={styles.qr_account_name}>
                {reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
                名称: 十八汇
              </div>
            </div>
          ) : (
            <div className={styles.re_account_type}>
              <div className={styles.account_tips}>
                {" "}
                复制
                {reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
                账号， 转账付款
              </div>
              <div className={styles.re_account_area}>
                <div className={styles.account_item}>
                  <div className={styles.acc_label}>
                    {reType === 0 ? "支付宝" : reType === 1 ? "微信" : "持卡人"}
                    名称:
                  </div>
                  <div className={styles.acc_num}>{reName}</div>
                  <CopyToClipboard text={reName} onCopy={handleCopy}>
                    <div className={styles.copyOrderNow}>复制</div>
                  </CopyToClipboard>
                </div>
                <div className={styles.account_item}>
                  <div className={styles.acc_label}>
                    {reType === 0 ? "支付宝" : reType === 1 ? "微信" : "银行卡"}
                    账号:
                  </div>
                  <div className={styles.acc_num}>{reAccount}</div>
                  <CopyToClipboard text={reAccount} onCopy={handleCopy}>
                    <div className={styles.copyOrderNow}>复制</div>
                  </CopyToClipboard>
                </div>
                {reType === 2 ? (
                  <div className={styles.account_item}>
                    <div className={styles.acc_label}>银行卡号:</div>
                    <div className={styles.acc_num}>{reBankName}</div>
                    <CopyToClipboard text={reBankName} onCopy={handleCopy}>
                      <div className={styles.copyOrderNow}>复制</div>
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
            <span style={{ color: "#1677ff" }}>官方客服</span>
          </div>
        </div>
        {/* 温馨提示 */}
      </div>
    </div>
  );
};

export default Recharge;