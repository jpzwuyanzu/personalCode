import React, { useEffect, useState } from 'react';
import { Divider } from 'antd'
import './index.scss'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

const Editor = () => {
    // 创建一个空的editorState作为初始值
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

    const loadHtml = async ()=> {
        // 假设此处从服务端获取html格式的编辑器内容
        // return await fetchEditorContent()
    }

    useEffect(() => {
        const htmlContent = loadHtml()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        setEditorState(BraftEditor.createEditorState(htmlContent))
    },[])

    const submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        //const htmlContent = editorState.toHTML()
        //const result = await saveEditorContent(htmlContent)
    }

    const handleEditorChange = (editorState) => {
        setEditorState(editorState)
    }

    return (
        <>
        <div className="editorTitle">
            <h1>何时使用</h1>
            <Divider/>
            <p>当用户需要一些特定输入时，此页面使用的富文本编辑器是braft-editor</p>
        </div>
        <div className="editorContent">
        <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={handleEditorChange}
                    onSave={submitContent}
                />
            </div>
        </div>
        </>
    );
}

export default Editor;
