import React, { useReducer } from "react";

//处理函数
const reducer = (prevState, action) => {
  let newState = { ...prevState };
  switch (action.type) {
    case "test-minus":
      newState.count--
      return newState
    case "test-add":
      newState.count++
      return newState
    default:
      return prevState
  }
};
//定义在外部的状态
const intialState = {
  count: 0,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <div>
      <button
        onClick={() => {
          dispatch("test-minus");
        }}
      >
        -
      </button>
      {state.count}
      <button
        onClick={() => dispatch({
            type: "test-add",
          })}
      >
        +
      </button>
    </div>
  );
}
