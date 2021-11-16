import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';

const Header = () => <header>header</header>
const Content = () => <div>content</div>

// 组件可以嵌套使用
// jsx顶级标签可以是空标签，或者是Fragment -- 不会在dom结构添加标签，但是Fragment使用更多，可以传递属性

// class App extends Component {
//   render () {
//     return (
//       <>
//         <Header/>
//         <Content/>
//       </>
//     )
//   }
// }

class App extends Component {
  render () {
    return (
      <Fragment name="aaa">
        <Header/>
        <Content/>
      </Fragment>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
