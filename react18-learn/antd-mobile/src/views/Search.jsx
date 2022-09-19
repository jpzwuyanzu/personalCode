/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {store} from "../06-Redux/redux/store";
import { getCinemaListAction } from "./../06-Redux/redux/actionCreator/getCinemaListAction";

export default function Search() {
  const [cinemaList, setCinemaList] = useState(
    store.getState().CinemaListReducer.list
  );
  const navigate = useNavigate();
  const [myText, setMyText] = useState("");
  const getCinemaList = useMemo(
    () =>
      cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(myText.toUpperCase()) ||
          item.address.toUpperCase().includes(myText.toUpperCase())
      ),
    [cinemaList, myText]
  );
  useEffect(() => {
    if (store.getState().CinemaListReducer.list.length === 0) {
      //去后台取数据
      // actionCreator 在这里处理异步处理
      store.dispatch(getCinemaListAction("8989")).then((res) => {
        setCinemaList(res);
      });
    } else {
      setCinemaList(store.getState().CinemaListReducer.list);
    }
  }, []);
  return (
    <div>
      <div>
        <input
          type="text"
          value={myText}
          onChange={(evt) => {
            setMyText(evt.target.value);
          }}
        />
      </div>
      {getCinemaList.map((item, index) => (
        <dl style={{ padding: "10px" }} key={item.cinemaId}>
          <dt>{item.name}</dt>
          <dd style={{ fontSize: "12px" }}>{item.address}</dd>
        </dl>
      ))}
    </div>
  );
}
