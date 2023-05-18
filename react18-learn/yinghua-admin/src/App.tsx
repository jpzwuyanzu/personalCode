import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'
import 'antd/dist/reset.css';
import './App.css'

export default function App() {
  return (
    <HashRouter>
      <MRouter/>
    </HashRouter>
  )
}
