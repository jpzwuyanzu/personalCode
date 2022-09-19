/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { getCinemaListAction } from "./../06-Redux/redux/actionCreator/getCinemaListAction";

 const Cinema = (props) =>  {
  // const [cityName, setCityName] = useState(
  //   store.getState().CityReducer.cityname
  // );
  // const [cinemaList, setCinemaList] = useState(
  //   store.getState().CinemaListReducer.list
  // );
  const navigate = useNavigate();
  useEffect(() => {
    if (props.cinemaList.length === 0) {
      //去后台取数据
      // actionCreator 在这里处理异步处理
      props.loadList('9999')
    }
  }, [props.cinemaList]);

  return (
    <div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ float: 'left' }} onClick={() => {
                navigate("/city");
            }}>城市： {props.cityName}</div>
        <div style={{ float: 'right' }} onClick={() => {
                navigate("/cinemas/search");
            }}>搜索</div>
      </div>
      {props.cinemaList.map((item, index) => (
        <dl style={{ padding: "10px" }} key={item.cinemaId}>
          <dt>{item.name}</dt>
          <dd style={{ fontSize: "12px" }}>{item.address}</dd>
        </dl>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cinemaList: state.CinemaListReducer.list,
    cityName: state.CityReducer.cityname
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    loadList(params) {
      return dispatch(getCinemaListAction(params))
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Cinema)
