import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import { message } from 'antd';
import { BaseModalConfig } from '@/constants';
import { WithButton } from '@/components/WithElement';
import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { Columns, FormType } from '@/types';

type Props = {
  type?: FormType;
  moduleName: string;
  editNameKey?: string;
  tableRef: any;
  children?: any;
  columns: Columns[];
  formWidth?: number;
  addRequest?: (params: any) => Promise<any> | undefined; // 创建请求
  editRequest?: (params: any) => Promise<any> | undefined; // 更新请求
  addAuth?: boolean;
  onFormValuesChange?: (values: any, formRef: any) => void;
};

export default forwardRef((props: Props, ref) => {
  const {
    moduleName,
    columns,
    children,
    tableRef,
    addRequest,
    editRequest,
    formWidth,
    addAuth,
    editNameKey = '',
  } = props;

  const formRef = useRef<ProFormInstance>();
  const formColumns = useRef(columns);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<FormType>(FormType.ADD);
  const [editFormData, setEditFormData] = useState<any>({});

  const showForm = async (type: FormType, formData: any) => {
    const _formData = { ...formData };
    setType(type);
    setEditFormData(_formData);
    setVisible(true);
    formRef?.current?.setFieldsValue(_formData);
  };

  const onVisibleChange = (_visible: boolean) => {
    const _type = !_visible ? FormType.ADD : type;

    if (type === FormType.ADD) {
      formRef?.current?.resetFields();
    }

    setVisible(_visible);
    setType(_type);
  };

  const onFinish = async (values: any) => {
    let formData: any = { ...values };
    if (type === FormType.EDIT && editFormData !== undefined) {
      formData = {
        ...editFormData,
        ...values,
      };
    }
    if (type === FormType.ADD) {
      await addRequest?.(formData);
      message.success('创建成功');
    } else if (type === FormType.EDIT) {
      await editRequest?.(formData);
      message.success('更新成功');
    }
    tableRef.current.reload();
    return true;
  };

  useImperativeHandle(ref, () => ({
    showForm,
  }));

  const getTitle = () => {
    if (type === FormType.ADD) {
      return `添加${moduleName}`;
    }
    return `编辑${moduleName}${
      editNameKey ? `(${editFormData[editNameKey]})` : ''
    }`;
  };

  return (
    <BetaSchemaForm
      layoutType="ModalForm"
      columns={formColumns.current}
      visible={visible}
      width={formWidth ?? 700}
      // layout={'horizontal'}
      // grid
      // labelCol={{ span: 3 }}
      modalProps={{
        ...BaseModalConfig,
        destroyOnClose: false,
        onCancel: () => setVisible(false),
      }}
      onVisibleChange={onVisibleChange}
      title={getTitle()}
      formRef={formRef}
      trigger={
        children ? (
          children
        ) : addRequest ? (
          <WithButton
            type="primary"
            icon={<PlusOutlined />}
            auth={addAuth ?? true}
          >
            添加{moduleName}
          </WithButton>
        ) : null
      }
      onFinish={onFinish}
      onValuesChange={(values) => {
        setTimeout(() => {
          props.onFormValuesChange?.(values, formRef);
        }, 0);
      }}
    />
  );
});
