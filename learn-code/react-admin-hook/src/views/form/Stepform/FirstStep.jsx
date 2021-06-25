import React,{memo} from 'react';
import {  Button, Form, Select, Input } from "antd";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
const { Option } = Select;
const FirstStep = memo((props) => {


    const { getFormData, changeCurrent } = props

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    console.log('Success:', values);
    changeCurrent(1)
    getFormData(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          receivename: "lucy",
          receiveemail: "1",
          codename: "不努力跟咸鱼有什么区别",
          prefix: "86",
          phone:'121212121'
        }}
        onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      >
        <Form.Item label="接收人" name="receivename">
          <Select>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        </Form.Item>

        <Form.Item label="接收邮箱" name="receiveemail">
          <Select disabled>
            <Option value="1">jack@gmail.com</Option>
            <Option value="2">Lucy@gmail.com</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="codename"
          label="接头暗号"
          rules={[
            {
              required: true,
              message: "请输入暗号",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="联系电话"
          rules={[{ required: true, message: "请输入你的联系电话!" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
        </Form.Item>
      </Form>
    </>
  );
});

export default FirstStep;
