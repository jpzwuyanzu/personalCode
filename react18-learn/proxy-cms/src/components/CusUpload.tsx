import { Upload, Modal, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { uploadFastImg } from '@/api/index'
import { respMessage } from '@/utils/message'
import React, { useState } from 'react';

interface IProps {
  uploadInfo?: any;
  isAdd?: boolean;
  saveUploadImgUrl: (url: string) => void
  fastHeadHost: any;
}

const CusUpload: any = ({ uploadInfo, isAdd, saveUploadImgUrl, fastHeadHost }:IProps) => {
  console.log(uploadInfo)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>((isAdd || uploadInfo && !uploadInfo.headImage) ? [] : [
    {
      uid: uploadInfo.id,
      name: uploadInfo.gameName,
      status: 'done',
      url: fastHeadHost+uploadInfo.headImage
    },
  ]);

  console.log(fileList)


  const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const customRequest = async (files: any) => {
    if(files.file) {
      const formData = new FormData()
      formData.append('file', files.file)
      const res: any = await uploadFastImg(formData)
      if(res && res.code && res.code === 200) {
        setFileList([{...fileList[0],'status': 'done','thumbUrl': res.data.fastUrl+''+res.data.fastPath}])
        saveUploadImgUrl(res.data.fastPath)
      } else {
        message.open({
          type: "error",
          content: respMessage[String(res.code)]
        });
      }
    }
  }

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && !file.thumbUrl) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    
    setPreviewImage(file.url || file.thumbUrl || (file.preview as string));
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
          customRequest={customRequest}
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
