import React from 'react';
import { Divider } from 'antd'

const AffixCom = () => {
    return (
        <div>
           <h1>Affix固钉</h1>
           <Divider/>
           <p>
           当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。
           </p>
           <p>页面可视范围过小时，慎用此功能以免遮挡页面内容。</p>
        </div>
    );
}

export default AffixCom;
