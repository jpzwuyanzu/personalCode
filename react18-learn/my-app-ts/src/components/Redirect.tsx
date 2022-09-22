import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect(props: any) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(props.to, { replace: true })
    })
    return null
}