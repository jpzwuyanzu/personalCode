import React, { useState } from "react";

const App = () => {
    
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (evt) => {
    setText(evt.target.value);
  };
  const handleAdd = () => {
    console.log(text);
    setList([...list, text]);
    setText("");
  };
  const handlleDel = (index) => {
    console.log(index);
    let newList = [...list];
    newList.splice(index, 1);
    setList([...newList]);
  };

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
      {
          !list.length && <div>暂无代办事项</div>
      }
    </div>
  );
};

export default App;
