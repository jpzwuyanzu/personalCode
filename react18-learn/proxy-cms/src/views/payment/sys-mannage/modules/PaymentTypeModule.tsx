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
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined ,PlusCircleOutlined} from "@ant-design/icons";
import CusUpload from "@/components/CusUpload";
import { updateAgentReciveType } from "@/api/index";
import { useAppSelector } from '@/hooks/hooks'
import styles from './PaymentTypeModule.module.scss'

interface IProps {
  moduleWidth?: any;
  data?: {
    payCode?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  paymentTypeInfo?: any;
  fastHeadHost?: any;
}

export default function PaymentTypeModule({
  moduleWidth,
  paymentTypeInfo,
  fastHeadHost,
  open,
  closeDrawer,
}: IProps) {
  console.log(paymentTypeInfo);
  console.log(fastHeadHost)
  const [paymentTypeForm] = Form.useForm();
  const [payCodeNow, setPayCodeNow] = useState('UNION_PAY'); //设置默认的收款方式
  const [isJumpOutSide, setIsJumpOutSide] = useState(1); //是否是外跳链接 1:内跳 2:外跳
  const [fastUrl, setFastUrl] = useState<string>("");
  const cusColor = useAppSelector((state) => state.cusColor.color)
  const [isShowAmountInput, setIsShowAmountinput] = useState(false); // 控制支持金额输入框
  const [supportAmount, setSupportAmount] = useState<any>([]); //支持金额列表

  const saveUploadImgUrl = (url: string) => {
    setFastUrl(url);
  };

  const fetchData = async () => {
    if (open) {
      if (paymentTypeForm) {
        console.log(paymentTypeInfo);
        if (Object.keys(paymentTypeInfo).length) {
          let supAmountList:any = [];
          if((paymentTypeInfo as any).amountList && (paymentTypeInfo as any).amountList.length) {
            (paymentTypeInfo as any).amountList.forEach((itm:any, _inx:Number) => supAmountList.push(Number(itm)/100))
          }
          paymentTypeForm.setFieldsValue({
            payCode: (paymentTypeInfo as any).payCode,
            payName: (paymentTypeInfo as any).payName,
            bankAccount: (paymentTypeInfo as any).bankAccount,
            status: (paymentTypeInfo as any).status,
            bankNo: (paymentTypeInfo as any).bankNo,
            bankName: (paymentTypeInfo as any).bankName,
            payImage: (paymentTypeInfo as any).payImage && (paymentTypeInfo as any).jumpType === 1
              ? fastHeadHost + "" + (paymentTypeInfo as any).payImage
              : (paymentTypeInfo as any).payImage,
              headImage: (paymentTypeInfo as any).payImage
              ? fastHeadHost + "" + (paymentTypeInfo as any).payImage
              : "",
            jumpType: (paymentTypeInfo as any).jumpType,
            amountList: supAmountList,
          });
          setPayCodeNow((paymentTypeInfo as any).payCode)
          setIsJumpOutSide((paymentTypeInfo as any).jumpType)
          setSupportAmount(
            supAmountList.length
              ? supAmountList
              : []
          );
        } else {
          paymentTypeForm.setFieldsValue({
            payCode: "UNION_PAY",
            payName: "",
            status: true,
            bankAccount: "",
            bankNo: "",
            bankName: "",
            headImage: "",
            payImage: "",
            jumpType: 1,
            amountList: []
          });
          setPayCodeNow('UNION_PAY')
          setIsJumpOutSide(1)
          setSupportAmount([]);
        }
        console.log(paymentTypeForm.getFieldsValue())
      }
    }
  };

  // 赋值给表单中支持金额字段
  const assignmentValue = (list: any) => {
    if (paymentTypeForm) {
      paymentTypeForm.setFieldsValue({ amountList: list });
    }
  };

  //添加支持金额
  const pushAmount = (e: any) => {
    let newAmount: any = Number(e.target.value);
    newAmount && setSupportAmount([...supportAmount, newAmount]);
    assignmentValue([...supportAmount, newAmount]);
    setIsShowAmountinput(false);
  };
  //删除支持金额
  const spliceAmout = (inx: any) => {
    let newAmount = supportAmount;
    newAmount.splice(inx, 1);
    setSupportAmount(newAmount);
    assignmentValue(newAmount);
  };

  const confirmEditUser = async () => {
    paymentTypeForm
      ?.validateFields()
      .then(async (values) => {
        console.log(values)
        console.log(paymentTypeInfo)
        //这里将支持金额数据转换成分
        let supAmountList:any = [];
        if(values.amountList && values.amountList.length) {
          values.amountList.forEach((itm:any, _inx:Number) =>  supAmountList.push(Number(itm)*100))
         
        }
        if (Object.keys(paymentTypeInfo).length) {
          const res: any = await updateAgentReciveType({
            payName: values.payName,
            payCode: values.payCode,
            status: Boolean(values.status) ? 1 : 2,
            bankName: values.bankName,
            id: paymentTypeInfo.id,
            bankAccount: values.bankAccount,
            bankNo: values.bankNo,
            jumpType: values.jumpType,
            payImage: values.jumpType === 1 && fastUrl ? fastUrl :  values.payImage,
            amountList: supAmountList
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
              content: respMessage[String(res.code)],
            });
          }
        } else {
          if (String(values.password) !== String(values.confirmPassword)) {
            paymentTypeForm.setFieldsValue({ confirmPassword: "" });
            message.open({
              type: "error",
              content: "两次输入的密码不一致!",
            });
          } else {
            const res: any = await updateAgentReciveType({
                payName: values.payName,
                payCode: values.payCode,
                status: Boolean(values.status) ? 1 : 2,
                bankName: values.bankName,
                id: paymentTypeInfo.id,
                bankAccount: values.bankAccount,
                jumpType: values.jumpType,
                payImage: values.jumpType === 1 && fastUrl ? fastUrl :  values.payImage,
                amountList: supAmountList
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
                content: respMessage[String(res.code)],
              });
            }
          }
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handlePayCodeChange = (value: any) => {
    setPayCodeNow(value)
  };

  const handleJumpTypeChange = (value: any) => {
    setIsJumpOutSide(value)
  }


  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Drawer
      getContainer={false}
      title={Object.keys(paymentTypeInfo).length === 0 ? "新增" : "编辑"}
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
            <Button type="primary" onClick={confirmEditUser}>
              确认
            </Button>
          </Space>
        </div>
      }
    >
      {open ? (
        <Form
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={paymentTypeForm}
          initialValues={{
            status: true,
            payCode: 'UNION_PAY',
            jumpType: 1
          }}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="payCode"
                label="收款方式"
                rules={[{ required: true, message: "请选择收款方式" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="请选择收款方式"
                  options={[
                    { value: "UNION_PAY", label: "银联" },
                    { value: "WX_PAY", label: "微信" },
                    { value: "ALI_PAY", label: "支付宝" },
                  ]}
                  onChange={handlePayCodeChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="jumpType"
                label="是否外跳"
                rules={[{ required: true, message: "请选择是否外跳" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="请选择是否外跳"
                  options={[
                    { value: 1, label: "非外跳" },
                    { value: 2, label: "外跳链接" },
                  ]}
                  onChange={handleJumpTypeChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="payName"
                label="收款账户名称"
                rules={[{ required: true, message: "请输入收款账户名称" }]}
              >
                <Input placeholder="请输入收款账户名称" />
              </Form.Item>
            </Col>
          </Row>
         {
          isJumpOutSide === 1 ? <>
          {/* 微信支付宝有二维码，银行卡没有 */}
          {
            (payCodeNow === 'ALI_PAY' || payCodeNow === 'WX_PAY') ? <> <Row>
            <Col span={24}>
              <Form.Item name="payImage" label="收款码">
                <CusUpload
                  saveUploadImgUrl={saveUploadImgUrl}
                  uploadInfo={paymentTypeInfo}
                  fastHeadHost={fastHeadHost}
                  isAdd={Object.keys(paymentTypeInfo).length === 0 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row></> : null
          }
          {
            (payCodeNow === 'ALI_PAY' ||  payCodeNow === 'UNION_PAY') ? <><Row>
            <Col span={24}>
              <Form.Item
                name="bankNo"
                label={ payCodeNow === 'UNION_PAY' ? '银行卡号' : "支付宝账号" }
                rules={[
                  {
                    required: true,
                    message: payCodeNow === 'UNION_PAY' ? '请输入银行卡号' : "请输入支付宝账号",
                  },
                ]}
              >
                <Input placeholder={ payCodeNow === 'UNION_PAY' ? '请输入银行卡号' : "请输入支付宝账号" } />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="bankAccount"
                label={ payCodeNow === 'UNION_PAY' ? '银行卡名称' : "支付宝名称" }
                rules={[
                  {
                    required: true,
                    message:  payCodeNow === 'UNION_PAY' ? '' +'请输入银行卡名称' : "请输入支付宝名称",
                  },
                ]}
              >
                <Input placeholder={payCodeNow === 'UNION_PAY' ? '' +'请输入银行卡名称' : "请输入支付宝名称"} />
              </Form.Item>
            </Col>
          </Row></>  : null
          }
          {
            payCodeNow === 'UNION_PAY' ? <><Row>
            <Col span={24}>
              <Form.Item
                name="bankName"
                label="银行名称"
                rules={[
                  {
                    required: true,
                    message: "请输入银行名称",
                  },
                ]}
              >
                <Input placeholder="请输入银行名称" />
              </Form.Item>
            </Col>
          </Row></> : null
          }
          </> : <>
          <Row>
            <Col span={24}>
              <Form.Item
                name="payImage"
                label="外跳链接"
                rules={[{ required: true, message: "请输入外跳链接" }]}
              >
                <Input placeholder="请输入外跳链接" />
              </Form.Item>
            </Col>
          </Row>
          </>
         }
          <Row>
          <Col span={24}>
                <Form.Item
                  name="amountList"
                  label="固定支持金额"
                  // rules={[{ required: true, message: "请添加支持金额" }]}
                >
                  <div className={styles.amountContainer}>
                    {/* <Space> */}
                    {supportAmount &&
                      supportAmount.map((itm: any, inx: any) => (
                        <Tag
                          className={styles.amountTag}
                          key={inx}
                          color="green"
                          closable
                          onClose={() => spliceAmout(inx)}
                        >
                          ¥{itm}
                        </Tag>
                      ))}

                    {/* </Space> */}
                    {isShowAmountInput ? (
                      <InputNumber
                        autoFocus
                        style={{ width: "80px" }}
                        min={1}
                        size="small"
                        className={styles.amountInput}
                        onBlur={(e) => pushAmount(e)}
                        onPressEnter={(e) => pushAmount(e)}
                      />
                    ) : (
                      <Tag
                        className={
                          supportAmount && supportAmount.length
                            ? styles.amountTag
                            : styles.addTag
                        }
                        icon={<PlusCircleOutlined />}
                        color={`${cusColor}`}
                        onClick={() => setIsShowAmountinput(true)}
                      >
                        添加
                      </Tag>
                    )}
                  </div>
                </Form.Item>
              </Col>
          </Row>
          <p style={{ paddingLeft: '10px',paddingBottom: '10px',paddingTop: '5px', color: '#ee0a24' }}>不配置固定金额,默认支持所有金额</p>
          <Row>
            <Col span={24}>
              <Form.Item name="status" label="收款方式状态" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : null}
    </Drawer>
  );
}
