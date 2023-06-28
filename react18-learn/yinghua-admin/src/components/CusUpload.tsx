import { Upload, Modal, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { uploadFastImg } from '@/api/index'
import { respMessage } from '@/utils/message'
import React, { useState } from 'react';

interface IProps {
  gameInfo?: any;
  isAddGame: boolean;
  saveUploadImgUrl: (url: string) => void
}

const CusUpload: any = ({ gameInfo, isAddGame, saveUploadImgUrl }:IProps) => {
  console.log(gameInfo, isAddGame)
  console.log(gameInfo && gameInfo.cover ? true : false)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>((isAddGame || gameInfo && !gameInfo.cover) ? [] : [
    {
      uid: gameInfo.id,
      name: gameInfo.gameName,
      status: 'done',
      url: gameInfo.host+gameInfo.cover,
    },
  ]);

  const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if(newFileList && (newFileList as any)[0] && (newFileList as any)[0]['originFileObj']) {
      const formData = new FormData()
      formData.append('file', (newFileList as any)[0]['originFileObj'])
      console.log(formData.getAll('file'))
      const res: any = await uploadFastImg(formData)
      if(res && res.code && res.code === 200) {
        saveUploadImgUrl(res.data.fastPath)
      } else {
        message.open({
          type: "error",
          content: respMessage[String(res.code)]
        });
      }
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          accept={'.jpg,.png,.jpeg'}
          name="file"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onRemove={ () => saveUploadImgUrl('') }
          onPreview={handlePreview}
          maxCount={1}
          beforeUpload={(_f,_fList) => false}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CusUpload;

function getBase64(_arg0: RcFile): string | PromiseLike<string | undefined> | undefined {
  throw new Error('Function not implemented.');
}
