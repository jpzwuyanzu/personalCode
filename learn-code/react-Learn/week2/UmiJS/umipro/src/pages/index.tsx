import styles from './index.less';
import { Table } from 'antd'
import { history, Link } from 'umi'

export default function IndexPage() {

  const formIsHalfFilledOut = true

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div>
      <h1 className={styles.title}>系统的首页</h1>
      <button onClick={ () => {
        history.push('/banner/list')
      } }>去轮播图列表</button>
      <Link to='/user/list'>去用户列表</Link>
      {/* <div> */}
      {/* 用户离开页面时提示一个选择 */}
      {/* <Prompt message="你确定要离开么？" /> */}

      {/* 用户要跳转到首页时，提示一个选择 */}
      {/* <Prompt
        message={(location) => {
          return location.pathname !== '/' ? true : `您确定要跳转到首页么？`;
        }}
      /> */}

      {/* 根据一个状态来确定用户离开页面时是否给一个提示选择 */}
      {/* <Prompt when={formIsHalfFilledOut} message="您确定半途而废么？" /> */}
    {/* </div> */}
    <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
