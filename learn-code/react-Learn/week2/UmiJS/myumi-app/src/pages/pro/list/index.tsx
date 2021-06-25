import React, { useEffect } from 'react';
import { connect } from 'umi'
import { Table } from 'antd'

interface IProps {
  pro: {
    prolist?: any
  }
}

const Pro = (props: IProps) =>  {
// console.log('pro', props)

  useEffect(() => {
    // props.dispatch({
    //   type: 'setup'
    // })
  }, [])
  const columns = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
    }, 
    {
      title: '产品名称',
      key: "proname",
      dataIndex: 'proname'
    }
  ]

  return (
    <Table dataSource= { props.pro.prolist } columns= { columns } rowKey = { item => item.id } />
  );
}

// class Pro extends React.Component {
//      columns = [
//     {
//       title: '序号',
//       render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
//     }, 
//     {
//       title: '产品名称',
//       key: "proname",
//       dataIndex: 'proname'
//     }
//   ]

//   render() {
//       return (
//         <Table dataSource= { this.props.pro.prolist } columns= { this.columns } rowKey = { item => item.id } />
//     );
//   }
// }

export default connect(({ pro }: any) => {
  // console.log(pro)
  return {pro}
})(Pro)