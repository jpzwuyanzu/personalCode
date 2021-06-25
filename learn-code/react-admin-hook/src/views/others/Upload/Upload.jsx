import React, { useState } from "react";
import { Divider, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss";
import Clipimg from './Clipimg'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const UploadPart = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (imageUrl) => setImageUrl(imageUrl),
        setLoading(false)
      );
    }
  };

  return (
    <>
      <div className="uploadTitle">
        <h1>何时使用</h1>
        <Divider />
        <p>
          上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。
        </p>
        <p>当需要上传一个或一些文件时。</p>
        <p>当需要展现上传的进度时。</p>
        <p>当需要使用拖拽交互时。</p>
      </div>
      <div className="uploadConetnt">
        <h1>用户头像</h1>
        <Divider />
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </div>
      <div className="uploadConet">
      <h1>照片墙</h1>
        <Divider />
          <Clipimg/>
      </div>
    </>
  );
};

export default UploadPart;
