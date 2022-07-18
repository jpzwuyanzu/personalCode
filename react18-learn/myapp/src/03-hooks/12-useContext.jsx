import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./../02-advanced/css/03-communination.css";

const GloabalContext = React.createContext(); //创建context对象
const App = () => {
  const [filmList, setFilmList] = useState([]);
  const [info, setInfo] = useState("");

  useEffect(() => {
    axios.get("/test.json").then((res) => {
      setFilmList(res.data.data.films);
    });
  }, []);

  return (
    <GloabalContext.Provider
      value={{
        call: "test---",
        sms: "短信",
        info: info,
        changeInfo: (value) => {
          setInfo(value);
        },
      }}
    >
      <div>
        {filmList.map((item) => (
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
  const value = useContext(GloabalContext)
  return (
    <div
      className="FilmItem"
      onClick={() => {
        console.log(synopsis);
        value.changeInfo(synopsis);
      }}
    >
      <img src={poster} alt={name} />
      <h4>{name}</h4>
      <div> {grade}</div>
    </div>
  );
};

const FilmDetail = () => {
    const value = useContext(GloabalContext)
  return (
      <div>
          {<div className="FilmDetail">{value.info}</div>}
      </div>
  );
};
