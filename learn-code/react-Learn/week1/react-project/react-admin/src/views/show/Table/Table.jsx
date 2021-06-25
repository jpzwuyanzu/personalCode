import React from "react";
import { Divider, Table, Tag, Space, Button, Anchor } from "antd";
import ControlTable from './controlTable'
import "./index.scss";

const { Column, ColumnGroup } = Table;
const { Link } = Anchor;

const TablePart = () => {
  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Button type="primary">{text}</Button>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">Invite {record.name}</Button>
          <Button type="primary">Delete</Button>
        </Space>
      ),
    },
  ];

  const data1 = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const data2 = [
    {
      key: "1",
      firstName: "John",
      lastName: "Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      firstName: "Jim",
      lastName: "Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      firstName: "Joe",
      lastName: "Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <div className="tabletitle">
        <h1>何时使用</h1>
        <Divider />
        <p>当有大量结构化数据需要展示时</p>
        <p>当需要对数据进行排序，搜索， 分页，自定义操作等复杂行为。</p>
        <Anchor className='toc-affix'>
                <Link href='#basic' title='基础表格' />
                <Link href='#JSX' title='JSX表格' />
                <Link href='#sort' title='可筛选排序表格' />
        </Anchor>
      </div>
      <div className="tablePart">
        <h1 id="basic">基础表格</h1>
        <Divider />
        <Table columns={columns1} dataSource={data1} />
      </div>
      <div className="tablePart">
        <h1 id="JSX">JSX风格表格</h1>
        <Divider />
        <Table dataSource={data2}>
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <>
                {tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <Button type="primary">Invite {record.lastName}</Button>
                <Button type="primary">Delete</Button>
              </Space>
            )}
          />
        </Table>
      </div>
       <div className="tablePart">
           <h1 id="sort">可控的筛选和排序</h1>
           <Divider/>
           <ControlTable/>
       </div>
    </>
  );
};

export default TablePart;
