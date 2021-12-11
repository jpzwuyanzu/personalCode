import React from "react";
import { Divider } from 'antd'
import AutoFinish from './component/AutoFinish'
import CasCom from './component/CasCom'
const ShowForm = () => {
  return (
    <>
    <h1>自动完成组件AutoComplete</h1>
    <Divider/>
    <AutoFinish/>
    <Divider/>
    <h1>级联选择器Cascader</h1>
    <Divider/>
    <CasCom/>
    </>
  );
};

export default ShowForm;
