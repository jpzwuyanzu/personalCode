import React, { useState, useEffect } from "react";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";

const Editor = () => {
  // 创建一个空的editorState作为初始值
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );

  useEffect(() => {
    // 假设此处从服务端获取html格式的编辑器内容
    //const htmlContent = await fetchEditorContent()
    const htmlContent = "";
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    setEditorState(BraftEditor.createEditorState(htmlContent));
  }, []);

  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editorState.toHTML();
    console.log(htmlContent)
    //const result = await saveEditorContent(htmlContent)
  };
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <div>
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
      />
      <div dangerouslySetInnerHTML={{__html: editorState.toHTML()}}></div>
      </div>

    </>
  );
};

export default Editor;
