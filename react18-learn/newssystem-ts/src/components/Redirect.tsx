import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = ({ to }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: true })
    },[])
    return null
}

export default Redirect