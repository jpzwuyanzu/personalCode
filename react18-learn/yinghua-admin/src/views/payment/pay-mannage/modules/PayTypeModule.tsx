import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Space,
  message,
  Table,
  Tag,
  Transfer,
  InputNumber
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import type { TransferItem } from "antd/es/transfer";
import { respMessage } from "@/utils/message";
import { upDateUpStreamChannel, upStreamMerchant, upStreamChannelList  } from "@/api/index";
import difference from "lodash/difference";
import styles from "./PayTypeModule.module.scss";

// props属性接口
interface IProps {
  moduleWidth?: any;
  data?: {
    name?: string;
    status?: number;
    id?: number;
  };
  closeDrawer?: () => void;
  open?: boolean;
  payTypeInfo?: any;
}

//穿梭框数据接口
interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

//数据接口 
interface DataType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
  tag: string;
}

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: any) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns: any = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<TransferItem> = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
          <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          bordered
          style={{ pointerEvents: listDisabled ? "none" : undefined,}}
          pagination={{ 'position': ['bottomCenter'], 'pageSizeOptions': [10] }}
          // onRow={({ key, disabled: itemDisabled }) => ({
          //   onClick: () => {
          //     if (itemDisabled || listDisabled) return;
          //     onItemSelect(
          //       key as string,
          //       !listSelectedKeys.includes(key as string)
          //     );
          //   },
          // })}
        />
      );
    }}
  </Transfer>
);

const rightTableColumns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    title: "渠道ID",
    align: 'center'
  },
  {
    dataIndex: "channelName",
    title: "渠道名称",
    align: 'center'
  },
  {
    dataIndex: "isNew",
    title: "是否为拉新渠道",
    align: 'center',
    render: (text) => <Tag>{text}</Tag>,
  },
  {
    dataIndex: "ratio",
    title: "占比数(%)",
    align: 'center',
    render: () => (<InputNumber
      size="small"
      defaultValue={0}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value: any) => value!.replace('%', '')}
    />)
  },
];

const  leftTableColumns: any = [
  {
    dataIndex: "key",
    title: "渠道ID",
    align: 'center'
  },
  {
    dataIndex: "channelName",
    title: "渠道名称",
    align: 'center'
  },
  {
    dataIndex: "isNew",
    title: "是否为拉新渠道",
    align: 'center',
    render: (text: any) => <Tag>{text}</Tag>
  },
  {
    dataIndex: "payType",
    title: "支付方式",
    align: 'center'
  },
  {
    dataIndex: "platformType",
    title: "支持平台",
    align: 'center'
  }
];

export default function PayTypeModule({ moduleWidth, payTypeInfo, open, closeDrawer }: IProps) {
  const [merchantForm] = Form.useForm();
  const [total, setTotal] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);
  const [targetKeys, setTargetKeys] = useState<any[]>([1,2,3]); //右边已经选择的渠道数据key
  const [leftTransferData, setLeftTransferData] = useState<any>([]); //左边可选渠道数据


  console.log(payTypeInfo)

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const loadData = async(page: number, pageSize: number) => {
    setpage(page)
    setPageSize(pageSize)
    fetchData({page, pageSize})
  }
  const fetchData = async (params?: any) => {
    if (open) {
        // 获取可选渠道
        const data: any = await upStreamChannelList({ page, pageSize, ...params })
        console.log(data)
        if(data && data.code && data.code === 200) {
          let allChannelList: any = data.page.list;
          if(allChannelList && allChannelList.length) {
            allChannelList.forEach((itm: any) => itm.key = itm.id)
          }
          setLeftTransferData(allChannelList ? allChannelList : []);
          setTotal(data.page.totalCount ? data.page.totalCount : 0);
        } else {
          message.open({
            type: 'error',
            content: respMessage[String(data.code)]
          })
        }
        
    }
  };

  const confirmEditChannel = async () => {
    merchantForm
      ?.validateFields()
      .then(async (values) => {
        if (Object.keys(payTypeInfo).length) {
          const res: any = await upDateUpStreamChannel({
            ...values,
            status: Boolean(values.status) ? 1 : 2,
          });
          if (res && res.code && res.code === 200) {
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
          const res: any = await upDateUpStreamChannel({
            ...values,
            status: Boolean(values.status) ? 1 : 2,
          });
          if (res && res.code && res.code === 200) {
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
      getContainer={false}
      title={Object.keys(payTypeInfo).length === 0 ? "新增支付渠道" : "支付渠道详情"}
      size={moduleWidth}
      placement="bottom"
      onClose={closeDrawer}
      open={open}
      extra={
        <div
          style={{
            textAlign: "right",
            paddingBottom: "10px",
            paddingTop: "10px",
            paddingRight: "20px",
          }}
        >
          <Space>
            <Button type="primary" danger onClick={closeDrawer}>
              取消
            </Button>
            <Button type="primary" onClick={confirmEditChannel}>
              确认
            </Button>
          </Space>
        </div>
      }
    >
      {open ? (
        <div style={{ padding: '0 20px', overflowY: 'hidden' }}>
          <TableTransfer
            dataSource={leftTransferData}
            targetKeys={targetKeys}
            showSearch={true}
            onChange={onChange}
            filterOption={(inputValue: any, item: any) => 
              (item.channelName!.indexOf(inputValue) !== -1)
            
              
            }
            titles={['可选择渠道', '已选择渠道']}
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </div>
      ) : null}
    </Drawer>
  );
}
