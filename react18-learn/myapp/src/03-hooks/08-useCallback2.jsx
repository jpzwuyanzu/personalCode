import React, { useState, useCallback, useMemo } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  // useCallback 缓存函数, 生成记忆后的的事件函数传递给子组件使用
  // useMemo更适合经过函数计算得到一个确定的值，比如记忆组件
  const handleChange = useCallback((evt) => {
    setText(evt.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    console.log(text);
    setList([...list, text]);
    setText("");
  }, [text, list]);

  const handlleDel = useMemo(() => (index) => {
    console.log(index);
    let newList = [...list];
    newList.splice(index, 1);
    setList([...newList]);
  }, [list]);

  return (
    <div>
      <input value={text} onChange={handleChange} />
      <button onClick={handleAdd}>add</button>
      <ul>
        {list.map((item, index) => (
          <li key={item}>
            {item}
            <button onClick={() => handlleDel(index)}>del</button>
          </li>
        ))}
      </ul>
      {!list.length && <div>暂无代办事项</div>}
    </div>
  );
};

export default App;
