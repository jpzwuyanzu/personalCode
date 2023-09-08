import React, { useState, useEffect, useCallback, useRef, useContext} from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Col,
  Row,
  message,
  Switch,
  Popconfirm,
  Select,
  Image,
} from "antd";
import { respMessage } from "@/utils/message";
import type { InputRef } from "antd";
import type { FormInstance } from "antd/es/form";
import {
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import PagiNation from "@/components/PagiNation";
import { userList, createUser, delUser } from "@/api/index";
import dayjs from "dayjs";
import UserListModule from "./modules/UserListModule";
import ResetPassModal from "../../../components/ResetPassModal";
import UserRechargeModule from './modules/UserRechargeModule'
import styles from "./UserList.module.scss";


const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<any> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const UserList: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableList, setTableList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [moduleWidth, setModuleWidth] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState(false); //重置密码弹框
  const [rechargeModalStatus, setRechargeModalStatus] = useState(false);//充值弹框
  const [fastHeadHost, setFastHeadHost] = useState("");
  const [searchUserForm] = Form.useForm();

  const onFinish = (values: any) => {
    fetchData(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetParams = () => {
    searchUserForm?.setFieldsValue({ username: "", status: 0});
    fetchData({});
  };
  const loadData = useCallback(
    (page: number, pageSize: number) => {
      setpage(page);
      setPageSize(pageSize);
      fetchData({ page, pageSize });
    },
    [page, pageSize]
  );

  const fetchData = async (params?: any) => {
    setLoading(true);
    const data: any = await userList({ page, pageSize, ...params,userType:0 });
    setLoading(false);
    if (data && data.code && data.code === 200) {
      setTableList(data.page.list ? data.page.list : []);
      setTotal(data.page.totalCount ? data.page.totalCount : 0);
      setFastHeadHost(data.fastUrl);
    } else {
      message.open({
        type: "error",
        content: respMessage[String(data.code)],
      });
    }
  };

  const switchUserStatus = async (checked: boolean, userId: any, key: any) => {
    setLoading(true);
    const resp: any = await createUser({
      id: userId,
      [key]: Number(Boolean(checked) ? 1 : 2),
    });
    setLoading(false);
    if (resp && resp.code && resp.code === 200) {
      message.open({
        type: "success",
        content: "修改成功",
      });
      fetchData({});
    } else {
      message.open({
        type: "error",
        content: respMessage[String(resp.code)],
      });
    }
  };

  const confirmDelRole = async (userId: any) => {
    const resp: any = await delUser({ id: userId });
    if (resp && resp.code && resp.code === 200) {
      fetchData({});
    } else {
      message.open({
        type: "error",
        content: respMessage[String(resp.code)],
      });
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defaultColumns: any= [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      align: 'center',
    },
    {
      title: "账号",
      dataIndex: "username",
      key: "username",
      align: "center",
      render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => <span>{text}</span>,
    },
    {
      title: "角色",
      dataIndex: "roleName",
      align: "center",
      key: "roleName"
    },
    {
      title: "头像",
      dataIndex: "headImage",
      align: "center",
      key: "headImage",
      render: (_text: any, record: any) => (
        <Image
          width={80}
          style={{ width: "80px", height: "80px", overflow: "hidden" }}
          src={`${fastHeadHost + record.headImage}?${Date.now()}`}
          fallback="data:image/png;base64,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"
        />
      ),
    },
    // {
    //   title: "店铺余额(¥)",
    //   dataIndex: "amount",
    //   align: "center",
    //   key: "amount",
    //   render: (text: any) => (
    //     <span>{text ? (Number(text) / 100).toFixed(2) : "0.00"}</span>
    //   ),
    // },
    // {
    //   title: "营业状态",
    //   dataIndex: "openStatus",
    //   align: "center",
    //   key: "openStatus",
    //   // render: (text: number) =>
    //   //   text === 1 ? (
    //   //     <Tag icon={<CheckCircleOutlined />} color="success">
    //   //       营业中
    //   //     </Tag>
    //   //   ) : (
    //   //     <Tag icon={<CloseCircleOutlined />} color="error">
    //   //       已停业
    //   //     </Tag>
    //   //   ),
    //   render: (text: any, record: any) => (
    //     <>
    //       <Switch
    //         checkedChildren={<CheckOutlined />}
    //         unCheckedChildren={<CloseOutlined />}
    //         checked={Number(text) === 1 ? true : false}
    //         onClick={(checked: boolean) => switchUserStatus(checked, record.id, 'openStatus')}
    //       />
    //     </>
    //   ),
    // },
    {
      title: "账号状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (text: any, record: any) => (
        <>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={Number(text) === 1 ? true : false}
            onClick={(checked: boolean) => switchUserStatus(checked, record.id, 'status')}
          />
        </>
      ),
    },
    // {
    //   title: "排序",
    //   dataIndex: "seq",
    //   align: "center",
    //   key: "seq",
    //   width: 88,
    //   editable: true,
    // },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
      width: 180,
      render: (text: string | number | Date | dayjs.Dayjs | null | undefined) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "更新时间",
      key: "updateTime",
      align: "center",
      dataIndex: "updateTime",
      width: 180,
      render: (text: string | number | Date | dayjs.Dayjs | null | undefined) => <>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</>,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 350,
      render: (_: any, record: any) => (
        <Space size="middle">
          {
            _.userType === 1 ? <Button type="primary" onClick={() => openRechargeModal(record)}>
            充值
          </Button> : null
          }
            <Button type="primary" onClick={() => openDrawer("378px", record)}>
              编辑
            </Button>
          <Button type="dashed" danger onClick={() => openModal(record)}>
            重置密码
          </Button>
            <Popconfirm
              title="删除"
              description="你确认删除该用户吗?"
              onConfirm={() => confirmDelRole(record.id)}
              onCancel={() => {}}
              okText="是"
              cancelText="否"
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSave = async (row: any) => {
    const newData = [...tableList];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setTableList(newData);
    const res: any = await createUser({
      id: row.id,
      seq: Number(row.seq),
    });
    if (res && res.code && res.code === 200) {
      message.open({
        type: "success",
        content: "修改成功",
      });
      fetchData({});
    } else {
      message.open({
        type: "error",
        content: respMessage[String(res.code)],
      });
    }
  };

  const columns = defaultColumns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  //新增/编辑用户
  const openDrawer = (moduleWidth: string, userInfo: any) => {
    setModuleWidth(moduleWidth);
    setUserInfo({ ...userInfo });
    setOpen(true);
  };
  //关闭抽屉
  const closeDrawer = useCallback(() => {
    setOpen(false);
    fetchData({});
  }, [open]);

  //打开重置密码
  const openModal = useCallback(
    (userInfo: any) => {
      setUserInfo(userInfo);
      setModalStatus(true);
    },
    [modalStatus]
  );

  //关闭重置密码
  const closeModal = useCallback(() => {
    setModalStatus(false);
    fetchData({});
  }, [modalStatus]);

  //打开充值弹框
  const openRechargeModal = useCallback(
    (userInfo: any) => {
      setUserInfo(userInfo);
      setRechargeModalStatus(true);
    },
    [rechargeModalStatus]
  );
  //关闭充值弹框
  const closeRechargeModal = useCallback(() => {
    setRechargeModalStatus(false);
    fetchData({});
  }, [rechargeModalStatus]);



  useEffect(() => {
    fetchData({});
  }, []);

  return (
    <div className={styles.TableCom_Container}>
      <div className={styles.Table_ContentArea}>
        <div className={styles.table_search}>
          <Form
            form={searchUserForm}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              status: 0
            }}
          >
            <Row justify="start">
              <Col span={5}>
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[{ required: false, message: "请输入账号!" }]}
                >
                  <Input placeholder="请输入账号" allowClear={true} />
                </Form.Item>
              </Col>
              {/* <Col span={4}>
                <Form.Item
                  label="用户类型"
                  name="userType"
                  rules={[{ required: false, message: "请选择用户类型!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="请选择用户类型"
                    onChange={() => {}}
                    options={[
                      { value: '', label: "全部" },
                      { value: 0, label: "管理账户" },
                      { value: 1, label: "代理账户" },
                    ]}
                  />
                </Form.Item>
              </Col> */}
              <Col span={5}>
                <Form.Item
                  label="用户状态"
                  name="status"
                  rules={[{ required: false, message: "请选择用户状态!" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={() => {}}
                    options={[
                      { value: 0, label: "全部" },
                      { value: 1, label: "启用" },
                      { value: 2, label: "禁用" },
                    ]}
                  />
                </Form.Item>
              </Col>
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
              {/* <JudgePemission pageUrl={'/payment/userlist_131'}> */}
              <Col span={1}>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button
                    type="primary"
                    onClick={() => resetParams()}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
              {/* </JudgePemission> */}
                <Col span={1}>
                  <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button
                      type="primary"
                      style={{ marginLeft: "19px" }}
                      onClick={() => openDrawer("500px", {})}
                    >
                      新增成员
                    </Button>
                  </Form.Item>
                </Col>
            </Row>
          </Form>
        </div>
        <div className={styles.table_content}>
          <Table
            components={components}
            columns={columns}
            dataSource={tableList}
            loading={loading}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{ y: "60vh" }}
          />
        </div>
        <div className={styles.bottom_Pag_area}>
          <PagiNation
            current={page}
            pageSize={pageSize}
            total={total}
            loadData={loadData}
          />
        </div>
      </div>
      <UserListModule
        moduleWidth={moduleWidth}
        userInfo={userInfo}
        fastHeadHost={fastHeadHost}
        open={open}
        closeDrawer={closeDrawer}
      />
      <ResetPassModal
        open={modalStatus}
        userInfo={userInfo}
        closeModal={closeModal}
        isTop={false}
      />
      <UserRechargeModule
       open={rechargeModalStatus}
       proxyInfo={userInfo}
       closeModal={closeRechargeModal}
       isTop={false}
      />
    </div>
  );
};

export default UserList;
