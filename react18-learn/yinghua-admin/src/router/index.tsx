import { useRoutes } from 'react-router-dom'
import { payment }  from './payment'
import { merchant } from './merchant'
const MRouter = () => {
    const element = useRoutes(String(import.meta.env.VITE_APP_ROUTE) === 'payment' ? payment : merchant)
    return element
}
export default MRouter

