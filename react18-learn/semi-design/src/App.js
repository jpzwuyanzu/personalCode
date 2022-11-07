import logo from './logo.svg';
import './App.css';
import { Button, Input } from '@douyinfe/semi-ui';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <Button type="secondary">次要按钮</Button>
          <Input defaultValue='hi'></Input>
        </a>
      </header>
    </div>
  );
}

export default App;
