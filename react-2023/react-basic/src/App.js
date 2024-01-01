import logo from './logo.svg';
import './App.css';
import { useState } from 'react'

function App() {
  const [list, setList] = useState([1,2,3])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          list.map((itm, inx) =>  <p key={inx}>
          Edit <code>{itm}src/App.js</code> and save to reload.
        </p>)
        }
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
