import React, { useState, useCallback } from "react";
import { Divider, Steps } from "antd";
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import "./index.scss";

const { Step } = Steps;
const steps = [
  {
    title: "填写接收信息",
  },
  {
    title: "确认接收信息",
  },
  {
    title: "完成",
  },
];

const Stepform = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({})

  const getFormData = useCallback( (values) => {
        setFormData(values)
    }, []) 

  const changeCurrent = (val) => {
      console.log(val)
      setCurrent(val)
  }

  return (
    <>
      <div className="stepform">
        <h1>何时使用</h1>
        <Divider />
        <p>当用户需要分步骤收集不同的信息时</p>
      </div>
      <Divider>分步表单</Divider>
      <div className="formContent">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {
              current === 0 ? 
              <FirstStep getFormData={getFormData} changeCurrent={changeCurrent}  /> 
              : (current === 1 ? <SecondStep  submitData={formData} changeCurrent={changeCurrent} />
              : <ThirdStep changeCurrent={changeCurrent}/>)
              
          }
        </div>
      </div>
    </>
  );
};

export default Stepform;
