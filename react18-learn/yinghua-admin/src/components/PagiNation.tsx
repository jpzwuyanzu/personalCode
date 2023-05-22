import type { PaginationProps } from "antd";
import { Pagination } from "antd";
interface IProps {
    current?: number
    pageSize?: number
    total: number
    loadData: (page: number, pageSize: number) => void
}

const showTotal: PaginationProps["showTotal"] = (total) =>
  `共有 ${total} 条`;
const PagiNation = ({ current, total, loadData }: IProps) => {
    const handlerOnChange = (page: number, pageSize: number) => {
        loadData(page, pageSize)
    }
    return (
        <>
          <Pagination
            size="small"
            total={total}
            showTotal={showTotal}
            showSizeChanger={true}
            current={current}
            showQuickJumper
            style={{ textAlign: "right", paddingTop: "20px" }}
            onChange={(page, pageSize) => handlerOnChange(page, pageSize)}
          />
        </>
      )
};
export default PagiNation;
