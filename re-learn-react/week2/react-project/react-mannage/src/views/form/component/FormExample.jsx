import React from "react";
import { 
    Form, 
    Input, 
    Button, 
    Divider, 
    Select, 
    Checkbox, 
    DatePicker,
    Radio
} from "antd";

const { Option } = Select
const { RangePicker } = DatePicker

const rangeConfig = {
    rules: [
        {
          type: 'array',
          required: true,
          message: 'Please select time!',
        },
      ],
  };

const FormExample = () => {
  const onFinish = (values) => {
    const validityPeriodValue = values['validity-reriod']
    // 日期组件是moment对象，需要格式化处理
    const lastvalues = {
        ...values,
        'range-time-picker': [
            validityPeriodValue[0].format('YYYY-MM-DD HH:mm:ss'),
            validityPeriodValue[1].format('YYYY-MM-DD HH:mm:ss'),
          ],
    }
    console.log("Success:", lastvalues);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const plainOptions = [
      { label: '推荐', value: 1 },
      { label: '不推荐', value: 2 }
  ]
  return (
    <>
      <div style={{ width: "700px" }}>
        <Divider />
        <h1>Form表单</h1>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
           label="性别"
           name="sex"
           rules={[{ required: true, message: '请选择性别!' }]}
          >
            <Select>
                <Option value="male">男</Option>
                <Option value="female">女</Option>
                <Option value="other">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item
          label="是否推荐"
          name="isRecomend"
          rules={[{ required: true, message: '请选择是否推荐!' }]}
          >
              <Checkbox.Group options={plainOptions}></Checkbox.Group>
          </Form.Item>
          <Form.Item
          label="有效期"
          name="validity-reriod"
          { ...rangeConfig }
          >
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
          label="会员等级"
          name="memberLevel"
          rules={[{ required: true, message: '请选择会员等级!' }]}
          >
              <Radio.Group>
                  <Radio value={1}>level-1</Radio>
                  <Radio value={2}>level-2</Radio>
                  <Radio value={3}>level-3</Radio>
                  <Radio value={4}>level-4</Radio>
              </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormExample;
