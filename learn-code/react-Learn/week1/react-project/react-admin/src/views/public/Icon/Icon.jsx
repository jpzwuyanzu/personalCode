import React from 'react';
import { Divider, Space }  from 'antd'
import { 
    StepBackwardOutlined,
    StepForwardOutlined,
    FastBackwardOutlined,
    FastForwardOutlined,
    ShrinkOutlined,
    ArrowsAltOutlined,
    DownOutlined,
    UpOutlined,
    LeftOutlined,
    RightOutlined,
    CaretUpOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    VerticalAlignBottomOutlined,
    RollbackOutlined ,
    ArrowUpOutlined,
    PlayCircleOutlined,
    MenuFoldOutlined,
    FullscreenOutlined,
    QuestionOutlined,
    QuestionCircleOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    PauseOutlined,
    PauseCircleOutlined,
    MinusOutlined,
    MinusCircleOutlined,
    PlusSquareOutlined,
    MinusSquareOutlined,
    InfoOutlined,
    InfoCircleOutlined,
    ExclamationOutlined,
    ExclamationCircleOutlined,
    CloseOutlined,
    CloseCircleOutlined,
    CloseSquareOutlined,
    IssuesCloseOutlined,
    ClockCircleOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    BarChartOutlined,
    DotChartOutlined,
    LineChartOutlined,
    RadarChartOutlined,
    HeatMapOutlined,
    FallOutlined,
    RiseOutlined,
    StockOutlined,
    BoxPlotOutlined,
    FundOutlined,
    SlidersOutlined
    
} from "@ant-design/icons";
import './index.scss'


const Icon = () => {
    return (
       <>
       <div className="directionIcon">
           <div className="title">
               <h1>方向性图标</h1>
                <Divider/>
           </div>
           <div className="icons">
                <Space>
                    <StepBackwardOutlined/>
                    <StepForwardOutlined />
                    <FastBackwardOutlined />
                    <FastForwardOutlined />
                    <ShrinkOutlined />
                    <ArrowsAltOutlined />
                    <DownOutlined />
                    <UpOutlined />
                    <LeftOutlined />
                    <RightOutlined />
                    <CaretUpOutlined />
                    <CaretLeftOutlined />
                    <CaretRightOutlined />
                    <VerticalAlignBottomOutlined />
                    <RollbackOutlined />
                    <ArrowUpOutlined />
                    <PlayCircleOutlined />
                    <MenuFoldOutlined />
                    <FullscreenOutlined />
                </Space>
           </div>
       </div>
       <div className="directionIcon">
           <div className="title">
               <h1>提示建议性图标</h1>
                <Divider/>
           </div>
           <div className="icons">
                <Space>
                <QuestionOutlined />
                <QuestionCircleOutlined />
                <PlusOutlined />
                <PlusCircleOutlined />
                <PauseOutlined />
                <PauseCircleOutlined />
                <MinusOutlined />
                <MinusCircleOutlined />
                <PlusSquareOutlined />
                <MinusSquareOutlined />
                <InfoOutlined />
                <InfoCircleOutlined />
                <ExclamationOutlined />
                <ExclamationCircleOutlined />
                <CloseOutlined />
                <CloseCircleOutlined />
                <CloseSquareOutlined />
                <IssuesCloseOutlined />
                <ClockCircleOutlined />
                </Space>
           </div>
       </div>
       <div className="directionIcon">
           <div className="title">
               <h1>数据类图标</h1>
                <Divider/>
           </div>
           <div className="icons">
                <Space>
                <AreaChartOutlined />
                <PieChartOutlined />
                <BarChartOutlined />
                <DotChartOutlined />
                <LineChartOutlined />
                <RadarChartOutlined />
                <HeatMapOutlined />
                <FallOutlined />
                <RiseOutlined />
                <StockOutlined />
                <BoxPlotOutlined />
                <FundOutlined />
                <SlidersOutlined />
                </Space>
           </div>
       </div>
       </>
       
    );
}

export default Icon;
