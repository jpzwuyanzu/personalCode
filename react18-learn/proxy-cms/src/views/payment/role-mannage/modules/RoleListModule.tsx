import React, { useState, useEffect } from 'react'
import { Button, Col,  Drawer, Form, Input, Row,  Space, Tree, message } from 'antd'
import { respMessage } from '@/utils/message'
import { roleDetail, editRole, addRole } from '@/api/index'

interface IProps {
    moduleWidth?: any
    data?:{
        name?: string
        status?: number
        id?: number
    }
    closeDrawer?: () => void
    open?: boolean,
    roleInfo?: any
}

export default function RoleListModule({ moduleWidth,roleInfo, open, closeDrawer }:IProps) {

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [treeData, setTreeData] = useState<any>([]);
  const [roleForm] = Form.useForm();
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: any, { halfCheckedKeys }: any) => {
    setCheckedKeys(checkedKeysValue)
    setHalfCheckedKeys(halfCheckedKeys)
  };

  const onSelect = (selectedKeysValue: React.Key[], _info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  const formPermissionData = (permissList: any) =>  {
    let level_F: any = []; //所有权限项
    let permissChecked: any = []; //被选中的选项ID
    let allExpend: any = []; //所有被展开的一级菜单ID
    if(permissList && permissList.length) {
        permissList.forEach((item: any) => {
            let level_one: any = {
                title: item.name,
                key: item.id,
                children: []
            }
            if(Number(item.checkStatus) === 1) {
                permissChecked.push(item.id)
            }
            
            if(item.list && item.list.length) {
                item.list.forEach((itm: any) => {
                    let level_two: any = {
                        title: itm.name,
                        key: itm.id,
                        children: []
                    }
                    if(Number(itm.checkStatus) === 1) {
                        permissChecked.push(itm.id)
                    }
                    if(itm.list && itm.list.length) {
                        itm.list.forEach((button_item: any) => {
                            let level_three: any = {
                                title: button_item.name,
                                key: button_item.id,
                                children: []
                            }
                            if(Number(button_item.checkStatus) === 1) {
                                permissChecked.push(button_item.id)
                            }
                            level_two['children'].push(level_three)
                        })
                    }
                    level_one['children'].push(level_two)
                })
                
            }
            allExpend.push(item.id)
            level_F.push(level_one)
        })
    }
    setExpandedKeys(allExpend)
    setCheckedKeys(permissChecked)
    setTreeData(level_F)
  }

  const fetchData = async (info: any) => {
    if(open) {
      const data: any = await roleDetail({ id: info.id ? info.id : '' })
    if(data.code && data.code === 200) {
        formPermissionData(data.role)
    } else {
      message.open({
        type: 'error',
        content: respMessage[String(data.code)]
      })
    }
    if(roleForm) {
      if(Object.keys(roleInfo).length) {
        roleForm?.setFieldsValue({'name': (roleInfo as any).name})
      } else {
        roleForm?.setFieldsValue({ 'name': ''})
        setCheckedKeys([])
      }
    }
    
    }
  }

  const confirmEditRole = async() => {
    roleForm.validateFields().then(async(values) => {
        if(Object.keys(roleInfo).length) {
           const res: any = await editRole({ id: roleInfo.id ,name: values.name, resourceIdList: checkedKeys.concat(halfCheckedKeys),  status: Number(roleInfo.status) })
           if(res.code === 200) {
            (closeDrawer as any)()
            message.open({
              type: "success",
              content: "编辑成功",
            });
        } else {
            message.open({
                type: 'error',
                content: respMessage[String(res.code)]
              })
        }
        } else {
            const res: any = await addRole({ name: values.name, resourceIdList: checkedKeys.concat(halfCheckedKeys), status: 1 })
            if(res.code === 200) {
                (closeDrawer as any)()
                message.open({
                  type: "success",
                  content: "创建成功",
                });
            } else {
                message.open({
                    type: 'error',
                    content: respMessage[String(res.code)]
                  })
            }
        }
        
    }).catch(errorInfo => {
        console.log(errorInfo)
    })
    
  }

  useEffect(() => {
    if(open && Object.keys(roleInfo).length){
      fetchData(roleInfo)
    } else {
        fetchData({})
    }
  }, [open])


  return (
    <Drawer title={ Object.keys(roleInfo).length ? '编辑角色' : '新增角色' } 
    getContainer={false}
    size={moduleWidth} 
    placement="right" 
    onClose={closeDrawer} 
    open={open}
    extra={
        <div style={{ 'textAlign': 'right', 'paddingBottom': '20px' ,'paddingTop': '20px','paddingRight': '20px' }}>
            <Space>
        <Button type='primary' danger onClick={closeDrawer}>取消</Button>
        <Button type="primary" onClick={confirmEditRole}>确认</Button>
    </Space>
        </div>
    }
    >
    <Form layout="horizontal" form={ roleForm } labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="角色名称"
                rules={[{ required: true, message: '请输入角色名称' }]}
              >
                <Input placeholder="请输入角色名称" />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row>
            <Col span={24}>
              <Form.Item
                name="status"
                label="角色状态"
              >
                <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={true}
                    />
              </Form.Item>
            </Col>
          </Row> */}
          <Row>
            <Col span={24}>
              <Form.Item
                name="permiss"
                label="权限"
                rules={[{ required: false, message: '请选择权限' }]}
              >
               <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
  </Drawer>
  )
}
