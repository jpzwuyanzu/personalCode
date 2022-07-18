import React, { useReducer, useContext } from "react";

const initialState = {
  a: "1111",
  b: "2222",
};

const reducer = (pervState, action) => {
  let newState = { ...pervState };

  switch (action.type) {
    case "change-A":
      newState.a = action.value;
      return newState;
    case "change-B":
      newState.b = action.value;
      return newState;

    default:
      return pervState;
  }
  return pervState;
};

const GlobalContext = React.createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div>
        <Child1 />
        <Child2 />
        <Child3 />
      </div>
    </GlobalContext.Provider>
  );
}

const Child1 = () => {
  const { dispatch } = useContext(GlobalContext);
  return (
    <div style={{ background: "red" }}>
      <button
        onClick={() => {
          dispatch({
            type: "change-A",
            value: "22222",
          });
        }}
      >
        改变A
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "change-B",
            value: "33333",
          });
        }}
      >
        改变B
      </button>
    </div>
  );
};

const Child2 = () => {
  const { state } = useContext(GlobalContext);
  return <div style={{ background: "yellow" }}>child2--{state.a}</div>;
};

const Child3 = () => {
  const { state } = useContext(GlobalContext);
  return <div style={{ background: "gray" }}>child3--{state.b}</div>;
};
