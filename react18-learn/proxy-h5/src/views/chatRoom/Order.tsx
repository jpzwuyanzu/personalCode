/* eslint-disable */
import React, { useEffect, useState, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Dialog, Toast } from 'antd-mobile'
import { loadCusOrderDetail, changeOrderStatus } from './../../api/index'
import CopyToClipboard from 'react-copy-to-clipboard'
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from './../../hooks/redux-hook'
import { switchState } from './../../store/order.slice'
import styles from './Order.module.scss'

interface IProp {
  orderStatusP: any
  orderInfoP: any
}

const Order = memo(({orderStatusP, orderInfoP}: IProp)=>  {

  console.log(orderStatusP)
  console.log(orderInfoP)
  const orderStateCache = useAppSelector((state: any) => state.updateState.status)
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [orderStatus, setOrderStatus] = useState<any>(Number(orderStatusP));
  const [orderNum, setOrderNum] = useState<any>(searchParams.get('orderNumber'));
  const [actAmount, setActAmount] = useState<any>(Number(searchParams.get('orderAmount')));
  const [orderInfo, setOrderInfo] = useState<any>(orderInfoP);
  const dispatch = useAppDispatch()

  const loadOrderDetail = async() => {
    const res:any = await loadCusOrderDetail({ fromUserId: searchParams.get('fromUserId'), orderNumber: searchParams.get('orderNumber') })
    console.log(res)
    if(res.code === 200 && res.data && res.data.order) {
      setOrderInfo(res.data.order)
      setOrderStatus(res.data.order.payStatus)
    }else{
      setOrderInfo({})
    }
  }

  const handleCopyOrderNum = () => {
    Toast.show({ content: '复制成功', position: 'top' })
  }

  const handleOrderBtn = async () => {
    if(orderStatusP === 2) {

     const result = await Dialog.confirm({
        content: '确定【取消订单】吗?',
      })
      if (result) {
        const res: any = await changeOrderStatus({merchantOrderId: orderInfoP.merchantOrderId, payStatus: 4})
        console.log(res)
        if(res && res.code === 200) {
          dispatch(switchState({status: true}))
          // setOrderStatus(4)
        }
        //在这里做取消订单的操作
        // setOrderStatus(3)
        setActAmount('')
        Toast.show({ content: '订单已取消', position: 'bottom' })
      }
    }
  }

  useEffect(() => {
    // loadOrderDetail()
  },[])




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
              <span className={ styles.info }>{dayjs(orderInfoP.ms).format("YYYY-MM-DD HH:mm:ss")}</span>
            </div>
            {
              orderInfoP.finishTime ?  <div className={ styles.detail_item }>
              <span className={ styles.label }>结束时间:</span>
              <span className={ styles.info }>{orderInfoP.finishTime}</span>
            </div> : null
            }
            <div className={ styles.detail_item }>
              <span className={ styles.label }>商品类型:</span>
              <span className={ styles.info }>{orderInfoP.orderType === 1 ? '游戏充值' : (orderInfoP.orderType === 2 ? '会员充值' : '金币充值')}</span>
            </div>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>支付方式:</span>
              <span className={ styles.info }>{orderInfoP.payCode === 'WX_PAY' ? '微信支付' : (orderInfoP.payCode === 'ALI_PAY' ? '支付宝' : '银联支付')}</span>
            </div>
            <div className={ styles.detail_item }>
              <span className={ styles.label }>订单金额:</span>
              <span className={ styles.info }>¥{(Number(searchParams.get('orderAmount'))/100).toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
      {/* 按钮模块 */}
      <div className={ styles.order_btns }>
        <div className={ styles.btns_group }>
          <div className={ styles.left_part }>实付金额:&nbsp;<span>{ orderStatusP === 1 || orderStatusP === 2 ? '¥' + (Number(actAmount)/100).toFixed(2) : '/' }</span></div>
          <div className={ orderStatusP === 2 ? styles.right_part : styles.disBtn } onClick={handleOrderBtn}>{ orderStatusP === 2 ? '取消订单' : (orderStatusP === 1 ? '充值成功' : '已关闭') }</div>
        </div>
      </div>
    </div>
  )
}) 


export default Order