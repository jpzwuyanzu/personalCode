import React, { useState } from 'react'
import {IconSun, IconMoon  } from "@douyinfe/semi-icons";

 const  SwitchTheme = () =>  {

    const [mode, setMode] = useState('light') 

    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
            setMode('light')
            // 以下这行代码，window.setMode仅用于当通过本Demo切换时，通知Semi官网Header记录更新当前模式（只用于演示）。在您的代码里无需存在。
            // window?.setMode('light');
        } else {
            body.setAttribute('theme-mode', 'dark');
            setMode('dark')
            // window.setMode('dark');
        }
    };

    return (
       <>
       {
        mode === 'light' ? <IconMoon onClick={switchMode} size="large" /> : <IconSun onClick={switchMode} size="large"/>
       }
       </>
    );
}


export default SwitchTheme