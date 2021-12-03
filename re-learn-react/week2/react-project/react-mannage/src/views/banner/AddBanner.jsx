import {
    Form,
    Button,
    Upload,
    Input
  } from 'antd';
  import { UploadOutlined } from '@ant-design/icons';
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  
  const AddBanner = () => {
    const onFinish = (values) => {
    //   console.log('Received values of form: ', values);
      values.thumbUrl = values.upload[0].thumbUrl
      console.log(values)
    };
  
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
        }}
      >
      <Form.Item
        label="跳转链接地址"
        name="link"
        rules={[{
            required: true, 
            message: '请输入链接地址' 
        }]}
      >
        <Input />
      </Form.Item>
        <Form.Item
          name="upload"
          label="上传图片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{
            required: true, 
            message: '请上传图片' 
        }]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
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
  
export default AddBanner