import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Space,
  message,
  Table,
  Tag,
  Transfer,
  InputNumber,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import type { TransferItem } from "antd/es/transfer";
import { respMessage } from "@/utils/message";
import { upStreamChannelList, upDatePayTypeList } from "@/api/index";
import difference from "lodash/difference";

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
          // console.log(key);
          // console.log(selected);
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
          style={{ pointerEvents: listDisabled ? "none" : undefined }}
          pagination={{ position: ["bottomCenter"], pageSizeOptions: [10] }}
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

export default function PayTypeModule({
  moduleWidth,
  payTypeInfo,
  open,
  closeDrawer,
}: IProps) {
  const [page, _setpage] = useState<number>(1);
  const [pageSize, _setPageSize] = useState<number>(100);
  const [targetKeys, setTargetKeys] = useState<any[]>([]); //右边已经选择的渠道数据key值数组
  const [leftTransferData, setLeftTransferData] = useState<any>([]); //左边可选渠道数据


  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };
  const changeChannelRadio = (e: any, item: any) => {
    let originData: any = [...leftTransferData];
    originData.forEach((itm: any) => {
      if (itm.id === item.id) {
        itm["ratio"] = Number(e.target.value.split("%")[0]);
      }
    });
    setLeftTransferData([...originData]);
  };

  const rightTableColumns: ColumnsType<DataType> = [
    {
      dataIndex: "key",
      title: "渠道ID",
      align: "center",
    },
    {
      dataIndex: "channelName",
      title: "渠道名称",
      align: "center",
    },
    {
      dataIndex: "isNew",
      title: "是否为拉新渠道",
      align: "center",
      render: (text: any) => (
        <Tag color={Number(text) === 0 ? "green" : "#2db7f5"}>
          {Number(text) === 0 ? "拉新通道" : "正常"}
        </Tag>
      ),
    },
    {
      dataIndex: "ratio",
      title: "占比数(%)",
      align: "center",
      render: (text, record: any) => (
        <InputNumber
          size="small"
          defaultValue={text}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value: any) => value!.replace("%", "")}
          onPressEnter={(e) => changeChannelRadio(e, record)}
          onBlur={(e) => changeChannelRadio(e, record)}
        />
      ),
    },
  ];

  const leftTableColumns: any = [
    {
      dataIndex: "key",
      title: "渠道ID",
      align: "center",
    },
    {
      dataIndex: "channelName",
      title: "渠道名称",
      align: "center",
    },
    {
      dataIndex: "isNew",
      title: "是否为拉新渠道",
      align: "center",
      render: (text: any) => (
        <Tag color={Number(text) === 0 ? "green" : "#2db7f5"}>
          {Number(text) === 0 ? "拉新通道" : "正常"}
        </Tag>
      ),
    },
    {
      dataIndex: "payType",
      title: "支付方式",
      align: "center",
      render: (text: any) => {
        switch (text) {
          case "WX_PAY":
            return "微信支付";
            break;
          case "ALI_PAY":
            return "微信支付";
            break;
          case "UNION_PAY":
            return "银联支付";
            break;
          default:
            break;
        }
      },
    },
    {
      dataIndex: "platformType",
      title: "支持平台",
      align: "center",
    },
  ];

  const fetchData = async (params?: any) => {
    if (open) {
      // 获取可选渠道
      const data: any = await upStreamChannelList({
        page,
        pageSize,
        ...params,
      });
      if (data && data.code && data.code === 200) {
        let allChannelList: any = data.page.list;
        if (allChannelList && allChannelList.length) {
          allChannelList.forEach((itm: any) => {
            itm.key = itm.id;
            itm["ratio"] = 0;
          });
        }
        combineChannelData(allChannelList, payTypeInfo.channelList);
      } else {
        message.open({
          type: "error",
          content: respMessage[String(data.code)],
        });
      }
    }
  };

  // 初始化合并已选数据中的占比数据到左侧所有渠道数据中,并设置选中渠道
  const combineChannelData = (originData: any, selectData: any) => {
    // 在这里设置已选渠道
    let collectChannelId: any = [];
    if (selectData && selectData.length) {
      selectData.forEach((itms: any) => {
        collectChannelId.push(itms.channelId);
        if (originData && originData.length) {
          originData.forEach((itm: any) => {
            if (itms["channelId"] === itm.id) {
              itm["ratio"] = itms["ratio"];
            }
          });
        }
      });
    }
    setLeftTransferData(originData ? originData : []);
    setTargetKeys(collectChannelId);
  };

  const confirmEditChannel = async () => {
    const channelList: any = [];
    let totalRadio = 0;
    if (targetKeys.length) {
      targetKeys.forEach((itms: any) => {
        leftTransferData.forEach((itm: any) => {
          if (itms === itm.id) {
            channelList.push({
              channelId: itm.id,
              name: itm.channelName,
              ratio: itm.ratio,
              isFornew: itm.isNew,
            });
          }
        });
      });
    }
    if (channelList.length) {
      channelList.forEach((itm: any) => {
        totalRadio += Number(itm.ratio);
      });
    }
    if (Number(totalRadio) > 100) {
      message.open({
        type: "error",
        content: "所选渠道总概率不能大于100%",
      });
    } else {
      if (Object.keys(payTypeInfo).length) {
        const res: any = await upDatePayTypeList({
          ...payTypeInfo,
          channelList,
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
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Drawer
      getContainer={false}
      title={
        Object.keys(payTypeInfo).length === 0 ? "新增支付渠道" : "支付渠道详情"
      }
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
        <div style={{ padding: "0 20px", overflowY: "hidden" }}>
          <TableTransfer
            dataSource={leftTransferData}
            targetKeys={targetKeys}
            showSearch={true}
            onChange={onChange}
            filterOption={(inputValue: any, item: any) =>
              item.channelName!.indexOf(inputValue) !== -1
            }
            titles={["可选择渠道", "已选择渠道"]}
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </div>
      ) : null}
    </Drawer>
  );
}
