import React from 'react';
import { Divider, Progress } from 'antd'
import './index.scss'
 
const ProgressPart = () => {
    return (
       <>
        <div className="progressTitle">
            <h1>何时使用</h1>
            <Divider/>
            <p>在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。</p>
            <p>当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时；</p>
            <p>当需要显示一个操作完成的百分比时。</p>
        </div>
        <div className="progressContent">
        <h1>标准进度条</h1>
            <Divider/>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress percent={50} showInfo={false} />
        </div>
        <div className="progressContent">
        <h1>进度圈</h1>
            <Divider/>
            <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
        </div>
       </>
    );
}

export default ProgressPart;
