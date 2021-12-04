import React from "react";
import { Form, Button, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const AddBanner = (props) => {

  const onFinish = (values) => {
    // console.log("Received values of form: ", values.bannerimg[0].thumbUrl);
    values.bannerimg = values.bannerimg[0].thumbUrl
    console.log(values)
    // 在这里调用添加接口
    //添加成功之后返回轮播图列表页面
    props.history.goBack()
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        "input-number": 3,
        "checkbox-group": ["A", "B"],
        rate: 3.5,
      }}
    >
      <Form.Item
        {...formItemLayout}
        name="link"
        label="跳转页面地址"
        rules={[
          {
            required: true,
            message: "请输入跳转地址",
          },
        ]}
      >
        <Input placeholder="请输入跳转地址" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="alt"
        label="alt"
        rules={[
          {
            required: true,
            message: "请输入提示语句",
          },
        ]}
      >
        <Input placeholder="请输入提示语句" />
      </Form.Item>
      <Form.Item
        name="bannerimg"
        label="上传图片"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
            {
              required: true,
              message: "请选择轮播图片",
            },
          ]}
      >
        <Upload name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBanner;
