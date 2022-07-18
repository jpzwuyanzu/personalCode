import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [list, setlist] = useState([]);
 


  // useEffect(() => {}, []) 数组为空的时候，表示函数只会执行一次
  useEffect(() => {
    axios.get("/test.json").then((res) => {
        console.log(res.data.data.films);
        setlist(res.data.data.films)
      });
  }, [])  

  

  return (
    <div>
        app
      <ul>
        {list.map((item) => (
          <li key={item.filmId}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
