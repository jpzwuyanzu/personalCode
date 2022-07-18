import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Cinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [myText, setMyText] = useState("");

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

  const getCinemaList = useMemo(
    () =>
      cinemas.filter(
        (item) =>
          item.name.toUpperCase().includes(myText.toUpperCase()) ||
          item.address.toUpperCase().includes(myText.toUpperCase())
      ),
    [cinemas, myText]
  );

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
// export default class Cinema2 extends Component {
//     state = {
//         cinemas: [],
//         myText: ''
//     }
//     constructor() {
//         super()
//         axios({
//             url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=7834489',
//             headers: {
//                 "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
//                 "X-Host": "mall.film-ticket.cinema.list"
//             }
//         }).then(res => {
//             this.setState({
//                 cinemas: res.data.data.cinemas,
//             })
//             console.log(res.data.data.cinemas)
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//     getCinemaList = () => {
//         return this.state.cinemas.filter(item => item.name.toUpperCase().includes(this.state.myText.toUpperCase()) || item.address.toUpperCase().includes(this.state.myText.toUpperCase()))
//     }

//     render() {
//         return (
//             <div>
//                 <input type="text" value={ this.state.myText } onChange={ (evt) => {
//                     this.setState({
//                         myText: evt.target.value
//                     })
//                 } } />
//                     {
//                         this.getCinemaList().map((item, index) =>
//                         <dl key={ item.cinemaId }>
//                             <dt>{ item.name }</dt>
//                             <dd>{ item.address }</dd>
//                         </dl>)
//                     }
//             </div>
//         )
//     }
// }
