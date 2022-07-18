import React, {
  Component,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";
import axios from "axios";
import "./../02-advanced/css/03-communination.css";

const initialState = {
  filmList: [],
  info: "",
};

const reducer = (prevState, action) => {
  let newState = { ...prevState };
  switch (action.type) {
    case "changeFilmList":
      newState.filmList = action.value;
      return newState;
    case "changeInfo":
      newState.info = action.value;
      return newState;

    default:
      return prevState;
  }
};

const GloabalContext = React.createContext(); //创建context对象
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get("/test.json").then((res) => {
      dispatch({
        type: "changeFilmList",
        value: res.data.data.films,
      });
    });
  }, []);

  return (
    <GloabalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div>
        {state.filmList.map((item) => (
          <FilmItem key={item.filmId} {...item}></FilmItem>
        ))}
        <FilmDetail></FilmDetail>
      </div>
    </GloabalContext.Provider>
  );
};

export default App;

const FilmItem = (props) => {
  let { name, poster, grade, synopsis } = props;
  const { dispatch } = useContext(GloabalContext);
  return (
    <div
      className="FilmItem"
      onClick={() => {
        console.log(synopsis);
        dispatch({
          type: "changeInfo",
          value: synopsis,
        });
      }}
    >
      <img src={poster} alt={name} />
      <h4>{name}</h4>
      <div> {grade}</div>
    </div>
  );
};

const FilmDetail = () => {
  const { state } = useContext(GloabalContext);
  return <div>{<div className="FilmDetail">{state.info}</div>}</div>;
};
