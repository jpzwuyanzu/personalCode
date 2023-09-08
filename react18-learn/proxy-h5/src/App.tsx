import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'
import styles from './app.module.scss'

export default function App() {
  return (
    <div className={ styles.page_container_all }> 
      <HashRouter>
      <MRouter></MRouter>
    </HashRouter>
    </div>
  )
}
