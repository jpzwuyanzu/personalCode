import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'
import { useAppSelector } from './hooks/redux-hook'
import {SHOW_TAB_KEY} from './store/tabbar.slice'

export default function App() {
  const showTabBar = useAppSelector((state) => state[SHOW_TAB_KEY]['status']);
  return (
    <HashRouter>
      <MRouter></MRouter>
    </HashRouter>
  )
}
