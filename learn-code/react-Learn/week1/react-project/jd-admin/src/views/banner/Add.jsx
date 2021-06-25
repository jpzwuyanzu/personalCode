import {
    Form,
    Button,
    Upload,
    Input,
    Image
  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { addBanner }  from './../../api/banner'


  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  
  const AddBanner = (props) => {

    const [url, seturl] = useState('')

    const normFile = (e) => {
        // console.log('Upload event:', e);
         seturl(e.fileList[0]['thumbUrl'])
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

    const onFinish = (values) => {
    //   console.log('Received values of form: ', values);
      values.bannerimg = values.bannerimg[0]['thumbUrl']
      console.log(values)
      addBanner(values).then(res => {
          console.log('res', res)
          props.history.goBack()
      })
    };
  
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
      >
          <Form.Item
        {...formItemLayout}
        name="link"
        label="跳转页面的地址"
        rules={[
          {
            required: true,
            message: '请输入跳转的地址',
          },
        ]}
      >
        <Input placeholder="请输入跳转的地址" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="alt"
        label="alt"
        rules={[
          {
            required: true,
            message: '请输入图片提示语句',
          },
        ]}
      >
        <Input placeholder="请输入图片提示语句" />
      </Form.Item>
  
        <Form.Item
          name="bannerimg"
          label="上传图片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: '请选择轮播图片',
            },
          ]}
        >
          <Upload name="logo"  listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
            <Image src={url}  />
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

  export default AddBanner