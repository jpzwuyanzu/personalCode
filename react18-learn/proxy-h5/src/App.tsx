import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'
import styles from './app.module.scss'
import { judgeMobile } from './utils/common'

export default function App() {
  return (
    <div className={ judgeMobile() === 'iosX' ? styles.page_container_all : (judgeMobile() === 'ios' ? styles.page_container_ios : styles.page_container_android) }> 
      <HashRouter>
      <MRouter></MRouter>
    </HashRouter>
    </div>
  )
}
