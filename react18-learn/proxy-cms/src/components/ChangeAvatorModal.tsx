import { useState } from "react";
import { Form, Modal, message } from "antd";
import { createUser } from "@/api/index";
import CusUpload from "./CusUpload";

interface IProps {
  open?: boolean;
  userInfo?: any;
  closeModal?: () => void;
  isTop?: boolean;
}

const ChangeAvatorModal: any = ({ open, userInfo, closeModal }: IProps) => {
  const [passForm] = Form.useForm();
  const [fastUrl, setFastUrl] = useState<string>("");

  const saveUploadImgUrl = (url: string) => {
    console.log(url);
    setFastUrl(url);
  };

  const handleOk = async () => {
    const values = await passForm.validateFields();
    console.log(values);
    if (fastUrl) {
      const res: any = await createUser({
        id: userInfo.id,
        headImage: fastUrl ? fastUrl : (userInfo as any).headImage,
      });
      console.log(res);
      handleCancel();
      if (res && res.code === 200) {
        message.open({
          type: "success",
          content: "修改成功",
        });
      }
    } else {
      message.open({
        type: "error",
        content: "请上传头像",
      });
    }
  };

  const handleCancel = () => {
    if (passForm) {
      setFastUrl("");
    }
    (closeModal as any)();
  };

  return (
    <>
      <Modal
        title="修改头像"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={350}
      >
        <Form
          form={passForm}
          name="passForm"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ paddingTop: 20 }}
          autoComplete="off"
        >
          <Form.Item label="头像" name="headImage">
            <CusUpload
              saveUploadImgUrl={saveUploadImgUrl}
              uploadInfo={userInfo}
              fastHeadHost={userInfo.fastUrl}
              isAdd={Object.keys(userInfo).length === 0 ? true : false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeAvatorModal;
