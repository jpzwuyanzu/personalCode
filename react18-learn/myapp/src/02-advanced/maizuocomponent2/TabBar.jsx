// import React, { Component } from "react";
import React from "react";

// export default class TabBar extends Component {
//       handleClick = (index) => {
//         //通知父组件该修改父组件的状态
//         this.props.event(index)
//       };
//     render() {
//         return (
//             <div>
//                 <ul>
//                 {this.props.list.map((item, index) => (
//                     <li
//                     key={item.id}
//                     className={this.props.current === index ? "active" : ""}
//                     onClick={() => {
//                         this.handleClick(index);
//                     }}
//                     >
//                     {item.text}
//                     </li>
//                 ))}
//                 </ul>
//             </div>
//         )
//     }
// }

const TabBar = (props) => {
  return (
    <div>
      <ul>
        {props.list.map((item, index) => (
          <li
            key={item.id}
            className={props.current === index ? "active" : ""}
            onClick={() => {
              props.event(index);
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
