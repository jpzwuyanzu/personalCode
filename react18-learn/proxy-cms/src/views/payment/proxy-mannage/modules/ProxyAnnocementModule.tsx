import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Row,
  Space,
  message,
  Switch,
} from "antd";
import { respMessage } from "@/utils/message";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { editAnoceMent } from "@/api/index";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
  moduleWidth?: any;
  data?: {
    noticeContent?: any;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  anoceMentInfo?: any;
}


const quillModules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
    //   ['link'],
      // ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }
  
  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    // 'link', 'image', 'video'
  ]

export default function ProxyAnnocementModule({
  moduleWidth,
  anoceMentInfo,
  open,
  closeDrawer,
}: IProps) {
  const [anoceMentInfoForm] = Form.useForm();
  const [editorState, setEditorState] = useState<any>('')

  const handleQuillContent = (html: any) => {
    setEditorState(html)
  }

  const fetchData = async () => {
    if (open) {
      if (anoceMentInfoForm) {
        //编辑
        if (Object.keys(anoceMentInfo).length) {
          anoceMentInfoForm.setFieldsValue({
            id: (anoceMentInfo as any).id,
            status: Number((anoceMentInfo as any).status) === 1 ? true : false,
            noticeContent: (anoceMentInfo as any).noticeContent,
          });
        } else {
          //新增
          anoceMentInfoForm.setFieldsValue({
            id: '',
            status: true,
            noticeContent: '',
          });
          setEditorState('')
        }
      }
    }
  };

  const confirmEditGame = async () => {
    anoceMentInfoForm
      ?.validateFields()
      .then(async (values) => {
        let params = {
          ...values,
          status: Boolean(values.status) ? 1 : 2,
          noticeContent: values.noticeContent,
        };
        if (Object.keys(anoceMentInfo).length) {
          const res: any = await editAnoceMent({
            id: anoceMentInfo.id,
            ...params,
          });
          if (res && res.code && res.code === 200) {
            setEditorState('');
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
          const res: any = await editAnoceMent({
            ...params,
          });
          if (res && res.code && res.code === 200) {
            setEditorState('');
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
      title={Object.keys(anoceMentInfo).length === 0 ? "新增公告" : "编辑公告"}
      getContainer={false}
      size={moduleWidth}
      placement="right"
      onClose={closeDrawer}
      open={open}
      footer={
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
            <Button type="primary" onClick={confirmEditGame}>
              确认
            </Button>
          </Space>
        </div>
      }
    >
      {open ? (
        <div style={{ overflowY: "scroll" }}>
          <Form
            layout="horizontal"
            form={anoceMentInfoForm}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            initialValues={{
              status: true,
              sort: 0,
            }}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  name="noticeContent"
                  label="套餐名称"
                  rules={[{ required: true, message: "请输入套餐名称" }]}
                >
                  <ReactQuill
                    theme="snow"
                    value={editorState}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder={'请输入公告内容'}
                    onChange={(html) => handleQuillContent(html)}
                />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="status"
                  label="公告状态"
                  valuePropName="checked"
                >
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
