import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

function useCinemaList() {
  const [cinemas, setCinemas] = useState([]);
  useEffect(() => {
    axios({
      url: "https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=7834489",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    })
      .then((res) => {
        console.log(res.data.data.cinemas);
        setCinemas(res.data.data.cinemas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return {
    cinemas,
  };
}

function useFilter(cinemas, myText) {
  const getCinemaList = useMemo(
    () =>
      cinemas.filter(
        (item) =>
          item.name.toUpperCase().includes(myText.toUpperCase()) ||
          item.address.toUpperCase().includes(myText.toUpperCase())
      ),
    [cinemas, myText]
  );

  return { getCinemaList };
}

const Cinema = () => {
  
  const [myText, setMyText] = useState("");
  const { cinemas } = useCinemaList();
  const { getCinemaList } = useFilter(cinemas, myText);

  return (
    <div>
      <input
        type="text"
        value={myText}
        onChange={(evt) => {
          setMyText(evt.target.value);
        }}
      />
      {getCinemaList.map((item, index) => (
        <dl key={item.cinemaId}>
          <dt>{item.name}</dt>
          <dd>{item.address}</dd>
        </dl>
      ))}
    </div>
  );
};

export default Cinema;
