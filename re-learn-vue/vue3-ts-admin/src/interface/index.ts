//分页配置数据类型
interface IPagnation {
    current: number;
    total: number;
    pageSize: number;
    showQuickJumper: boolean;
    showTotal (total: number): string
}
//订单列表数据类型
interface IOrderItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }
// 列表分页返回数据类型
interface IResult {
  list: object[];
}

  export type {
    IOrderItem,
    IPagnation,
    IResult
  }