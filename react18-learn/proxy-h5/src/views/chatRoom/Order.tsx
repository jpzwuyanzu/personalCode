import React, { useState } from 'react'
import { Card, Dialog, Toast } from 'antd-mobile'
import CopyToClipboard from 'react-copy-to-clipboard'
import styles from './Order.module.scss'

const Order = ()=>  {
  /**
   * orderStatus: 
   * 0: 进行中订单，可以取消
   * 1: 已关闭， 按钮不可以点击
   * 2: 充值成功， 不可以点击
   */
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderNum, setOrderNum] = useState('IM7879879878978787987');
  const [actAmount, setActAmount] = useState(3000);

  const handleCopyOrderNum = () => {
    Toast.show({ content: '复制成功', position: 'top' })
  }

  const handleOrderBtn = async () => {
    if(!orderStatus) {
     console.log('点击取消订单')
     const result = await Dialog.confirm({
        content: '确定【取消订单】吗?',
      })
      if (result) {
        //在这里做取消订单的操作
        setOrderStatus(1)
        Toast.show({ content: '订单已取消', position: 'bottom' })
      }
    }
  }



  return (
    <div className={ styles.proxy_order_container }>
      <div className={ styles.card_container }>
        <Card title='订单详情' onClick={() => {}}>
          <div className={ styles.detail_container }>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>订单编号:</span>
              <span className={ styles.info }>{ orderNum }</span>
              <CopyToClipboard text={orderNum} onCopy={handleCopyOrderNum}>
               <div className={ styles.copyOrderNow }>复制</div>
              </CopyToClipboard>
            </div>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>创建时间:</span>
              <span className={ styles.info }>2023-07-31 15:53:50</span>
            </div>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>结束时间:</span>
              <span className={ styles.info }>2023-07-31 15:53:50</span>
            </div>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>商品类型:</span>
              <span className={ styles.info }>游戏充值</span>
            </div>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>支付方式:</span>
              <span className={ styles.info }>支付宝</span>
            </div>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>订单金额:</span>
              <span className={ styles.info }>¥10000.00</span>
            </div>
          </div>
        </Card>
      </div>
      {/* 按钮模块 */}
      <div className={ styles.order_btns }>
        <div className={ styles.btns_group }>
          <div className={ styles.left_part }>实付金额:&nbsp;<span>{ actAmount ? '¥' + actAmount.toFixed(2) : '/' }</span></div>
          <div className={ orderStatus === 0 ? styles.right_part : styles.disBtn } onClick={handleOrderBtn}>{ orderStatus === 0 ? '取消订单' : (orderStatus === 1 ? '已关闭' : '充值成功') }</div>
        </div>
      </div>
    </div>
  )
} 


export default Order