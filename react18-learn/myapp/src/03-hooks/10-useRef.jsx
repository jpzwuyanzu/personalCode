import React, { useState, useRef } from "react";

const App = () => {
    
  const [list, setList] = useState([]);
  const myText = useRef() // 等价于React.createRef

  const handleAdd = () => {
      console.log(myText.current.value)
      setList([...list, myText.current.value])
      myText.current.value = ''
  };
  const handlleDel = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList([...newList]);
  };

  return (
    <div>
      <input ref={ myText }/>
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
