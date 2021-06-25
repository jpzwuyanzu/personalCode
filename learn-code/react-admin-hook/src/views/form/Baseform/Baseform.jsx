import React, { useState } from "react";
import {
  Divider,
  Form,
  Input,
  Cascader,
  Select,
  Checkbox,
  Button,
  Radio,
  DatePicker,
  Rate,
  Switch,
  Slider,
  message,
} from "antd";
import "./index.scss";

const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Baseform = () => {
  const [form] = Form.useForm();
  const [sexType, setSexType] = useState(1);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    message.success("你很棒，这么快就填写好了信息");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  //获取性别
  const chooseSextype = (e) => {
    console.log("radio checked", e.target.value);
    setSexType(e.target.value);
  };
  // 获取爱好
  const choosehobby = (list) => {
    setCheckedList(list);
  };
  //获取出生日期
  const getBirthDay = (date, dateString) => {
    console.log(date, dateString);
  };
  //获取slider的值
  const getSliderValue = (value) => {
    console.log(`slider value 为 ${value}`);
  };

  return (
    <>
      <div className="baseFormHeader">
        <h1>何时使用</h1>
        <Divider />
        <p>用于创建一个实体或收集信息。</p>
        <p>需要对输入的数据类型进行校验时。</p>
      </div>
      <div className="formContent">
        <Divider style={{ marginBottom: "20px" }}>基础功能</Divider>
        <div className="formArea">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="nickname"
              label="用户名"
              tooltip="起一个别致的用户名"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="sex"
              label="性别"
              rules={[
                {
                  required: true,
                  message: "请选择性别",
                },
              ]}
            >
              <Radio.Group onChange={chooseSextype} value={sexType}>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
                <Radio value={3}>不详</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="hobbys"
              label="爱好"
              rules={[
                {
                  required: true,
                  message: "请选择一个爱好",
                },
              ]}
            >
              <CheckboxGroup
                options={plainOptions}
                value={checkedList}
                onChange={choosehobby}
              />
            </Form.Item>
            <Form.Item
              name="age"
              label="年龄"
              rules={[
                {
                  required: true,
                  message: "请输入年龄",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="birthDate"
              label="出生日期"
              rules={[
                {
                  required: true,
                  message: "请输入出生日期",
                },
              ]}
            >
              <DatePicker onChange={getBirthDay} />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: "email",
                  message: "请输入合法邮箱地址",
                },
                {
                  required: true,
                  message: "请输入你的邮箱地址",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "请输入你的密码！",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请确认你的密码!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="residence"
              label="家庭住址"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "请输入家庭住址!",
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: "请输入你的联系电话!" }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="rate" label="评分">
              <Rate />
            </Form.Item>
            <Form.Item name="switch" label="switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="slider" label="slider">
              <Slider onChange={getSliderValue} />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                阅读并理解 <a href="https://ant.design">此协议</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Baseform;
