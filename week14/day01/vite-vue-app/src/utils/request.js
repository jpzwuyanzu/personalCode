import axios from 'axios'

const isDev = import.meta.env.DEV
// 
const request  = axios.create({
    baseURL: isDev ? 'http://localhost:3000' : ''
})

export default  request