interface IPagnation {
    current: number;
    total: number;
    pageSize: number;
    showQuickJumper: boolean;
    showTotal (total: number): string
}
interface IOrderItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }

  export type {
    IOrderItem,
    IPagnation
  }