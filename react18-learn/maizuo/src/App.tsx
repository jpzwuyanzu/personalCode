import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'
import MyTabBar from './components/MyTabBar';

export default function App() {
  return (
    <HashRouter>
      <MRouter></MRouter>
      <MyTabBar/>
    </HashRouter>
  )
}
