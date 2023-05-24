import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Select,
  message,
  Switch,
  Tag,
  InputNumber
} from "antd";
import { respMessage } from '@/utils/message'
import { CheckOutlined, CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MD5 from "md5";
import { upDateUpStreamChannel, upStreamMerchant } from "@/api/index";
import styles from './ChannelModule.module.scss'

interface IProps {
  moduleWidth?: any;
  data?: {
    name?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  channelInfo?: any;
}

const payTypeArr: any = [{value: 'WX_PAY',label: '微信支付'},{value: 'ALI_PAY',label: '支付宝'},{value: 'UNION_PAY',label: '银联支付'}] //支付类型
const pullNew: any = [{value: 0,label: '拉新通道'},{value: 1,label: '正常'}] //拉新下拉列表
const insideArr: any = [{value: 0,label: '保护'},{value: 1,label: '不保护'}] //是否内层保护列表
const platsArr: any = [{value: 'ALL',label:'所有平台'},{value: 'IOS',label:'IOS'},{value: 'ANDROID',label:'ANDROID'},{value: 'PC',label:'PC'}];// 渠道支持平台

export default function UpStreamModule({
  moduleWidth,
  channelInfo,
  open,
  closeDrawer,
}: IProps) {
  const [channelForm] = Form.useForm();
  const [merchantList, SetMerchantList] = useState<any[]>([]); //下拉框商户列表
  console.log(channelInfo)



  const [isShowAmountInput, setIsShowAmountinput] = useState(false); // 控制支持金额输入框
  const [supportAmount, setSupportAmount] = useState<any>([]) //支持金额列表

  const fetchData = async () => {
    if (open) {
      const data: any = await upStreamMerchant({});
      if (data && data.code && data.code === 200) {
        let filterMerchantList: any[] = [];
        if (data.page.list && data.page.list.length) {
          data.page.list.forEach((itm: any) => {
            filterMerchantList.push({ value: itm.id, label: itm.channelName });
          });
        }
        SetMerchantList(filterMerchantList);
      } else {
        message.open({
          type: "error",
          content: respMessage[String(data.code)]
        });
      }
      if (channelForm) {
        //编辑
        if (Object.keys(channelInfo).length) {
          channelForm.setFieldsValue({
            channelName: (channelInfo as any).channelName,
            payType: (channelInfo as any).payType,
            platformType: (channelInfo as any).platformType ? (channelInfo as any).platformType.split(',') : [],
            amountList: (channelInfo as any).amountList,
            payCode: (channelInfo as any).payCode,
            minAmount: (channelInfo as any).minAmount,
            maxAmount: (channelInfo as any).maxAmount,
            rate: (channelInfo as any).rate,
            merchantNo: (channelInfo as any).merchantNo,
            merchantId: (channelInfo as any).merchantId,
            gatewayUrl: (channelInfo as any).gatewayUrl,
            callbackUrl: (channelInfo as any).callbackUrl,
            merchantCert: (channelInfo as any).merchantCert,
            callbackIp: (channelInfo as any).callbackIp,
            isNew: (channelInfo as any).isNew,
            inside: (channelInfo as any).inside,
            status: (channelInfo as any).status,
            
            
          });
          setSupportAmount((channelInfo as any).amountList ? (channelInfo as any).amountList : [])
        } else {
          //新增
          channelForm.setFieldsValue({
            channelName: "",
            payType: undefined,
            platformType: undefined,
            amountList: [],
            payCode: '',
            minAmount: '',
            maxAmount: '',
            rate: 0,
            merchantNo: '',
            merchantId: undefined,
            gatewayUrl: '',
            callbackUrl: '',
            merchantCert: '',
            callbackIp: '',
            isNew: undefined,
            inside: undefined,
            status: true,
          });
          setSupportAmount([])
        }
      }
    }
  };

  //添加支持金额
  const pushAmount = (e: any) => {
    let newAmount: any = e.target.value;
    newAmount && setSupportAmount([...supportAmount, newAmount])
    assignmentValue([...supportAmount, newAmount])
    setIsShowAmountinput(false)
  }
  //删除支持金额
  const spliceAmout = (inx: any) => {
    let newAmount = supportAmount;
    newAmount.splice(inx,1)
    setSupportAmount(newAmount)
    assignmentValue(newAmount)
  }
  // 赋值给表单中支持金额字段
  const assignmentValue = (list: any) => {
    if(channelForm) {
      channelForm.setFieldsValue({ 'amountList':  list})
    }
  }

  const confirmEditChannel = async () => {
    channelForm
      ?.validateFields()
      .then(async (values) => {
        if (Object.keys(channelInfo).length) {
          const res: any = await upDateUpStreamChannel({
            ...values,
            status: Boolean(values.status) ? 1 : 2,
            platformType: values.platformType ? values.platformType.join(','): '',
            rate: values.rate ? values.rate/100 : 0
          });
          if (res && res.code && res.code === 200) {
            (closeDrawer as any)();
            message.open({
              type: "success",
              content: "编辑成功",
            });
          } else {
            message.open({
              type: "error",
              content: respMessage[String(res.code)]
            });
          }
        } else {
            const res: any = await upDateUpStreamChannel({
              ...values,
              status: Boolean(values.status) ? 1 : 2,
              platformType: values.platformType ? values.platformType.join(','): '',
              rate: values.rate ? values.rate/100 : 0
            });
            if (res && res.code && res.code === 200) {
              (closeDrawer as any)();
              message.open({
                type: "success",
                content: "创建成功",
              });
            } else {
              message.open({
                type: "error",
                content: respMessage[String(res.code)]
              });
            }
          
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Drawer
      getContainer={false}
      title={Object.keys(channelInfo).length === 0 ? "新增渠道" : "编辑渠道"}
      size={moduleWidth}
      placement="right"
      onClose={closeDrawer}
      open={open}
      extra={
        <div
          style={{
            textAlign: "right",
            paddingBottom: "20px",
            paddingTop: "20px",
            paddingRight: "20px",
          }}
        >
          <Space>
            <Button type="primary" danger onClick={closeDrawer}>
              取消
            </Button>
            <Button type="primary" onClick={confirmEditChannel}>
              确认
            </Button>
          </Space>
        </div>
      }
    >
      {open ? (
        <div style={{ overflowY: 'scroll' }}>
          <Form
          layout="horizontal"
          form={channelForm}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          initialValues={{
            status: true,
            rate: 0
          }}
        >
           <Row>
            <Col span={24}>
              <Form.Item
                name="channelName"
                label="渠道名称"
                rules={[{ required: true, message: "请输入渠道名称" }]}
              >
                <Input placeholder="请输入渠道名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="payType"
                label="支付类型"
                rules={[{ required: true, message: "请选择支付类型" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="请选择支付类型"
                  options={[...payTypeArr]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="platformType"
                label="支持平台"
                rules={[{ required: true, message: "请选择支持平台" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  mode="multiple"
                  placeholder="请选择支持平台"
                  options={[...platsArr]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="amountList"
                label="支持金额"
                rules={[{ required: true, message: "请添加支持金额" }]}
              >
               <div className={ styles.amountContainer }>
               {/* <Space> */}
               {
                supportAmount && supportAmount.map((itm: any, inx: any) => <Tag className={ styles.amountTag } key={inx} color="green"  closable onClose={ () => spliceAmout(inx) }>¥{itm}</Tag>)
               }
                
                {/* </Space> */}
                {
                  isShowAmountInput ? <InputNumber autoFocus  style={{ width: '80px' }} min={1} size="small"  className={ styles.amountInput } onBlur={ (e) => pushAmount(e) }  onPressEnter={ (e) => pushAmount(e) } /> : <Tag className={ supportAmount && supportAmount.length ? styles.amountTag :  styles.addTag } icon={<PlusCircleOutlined />} color="#00B96B" onClick={() => setIsShowAmountinput(true)}>添加</Tag>
                }
               </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="payCode"
                label="渠道CODE"
                rules={[{ required: true, message: "请输入渠道CODE" }]}
              >
                <Input placeholder="请输入渠道CODE" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="minAmount"
                label="最小金额"
                rules={[{ required: true, message: "请输入最小金额" }]}
              >
                <InputNumber style={{ width: '100%' }} min={1} placeholder="请输入最小金额" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="maxAmount"
                label="最大金额"
                rules={[{ required: true, message: "请输入最大金额" }]}
              >
                <InputNumber style={{ width: '100%' }} min={1} placeholder="请输入最大金额" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="rate"
                label="渠道费率"
                rules={[{ required: true, message: "请输入渠道费率" }]}
              >
               <InputNumber
               style={{ width: '100%' }}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value!.replace('%', '')}
              />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="merchantNo"
                label="渠道商户号"
                rules={[{ required: true, message: "请输入渠道商户号" }]}
              >
                <Input placeholder="请输入渠道商户号" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="merchantId"
                label="上游商户"
                rules={[{ required: true, message: "请选择上游商户" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="请选择上游商户"
                  options={[...merchantList]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="gatewayUrl"
                label="网关地址"
                rules={[{ required: true, message: "请输入网关地址" }]}
              >
                <Input placeholder="请输入网关地址" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="callbackUrl"
                label="回调地址"
                rules={[{ required: true, message: "请输入回调地址" }]}
              >
                <Input placeholder="请输入回调地址" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="merchantCert"
                label="商户密钥"
                rules={[{ required: true, message: "请输入商户密钥" }]}
              >
                <Input placeholder="请输入商户密钥" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="callbackIp"
                label="白名单IP"
                rules={[{ required: true, message: "请输入白名单IP" }]}
              >
                <Input placeholder="白名单IP逗号分隔" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="isNew"
                label="是否拉新"
                rules={[{ required: true, message: "请选择是否拉新" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="请选择是否拉新"
                  options={[...pullNew]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="inside"
                label="内层保护"
                rules={[{ required: true, message: "请选择是否内层" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="请选择是否内层"
                  options={[...insideArr]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="status" label="渠道状态" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </div>
      ) : null}
    </Drawer>
  );
}
