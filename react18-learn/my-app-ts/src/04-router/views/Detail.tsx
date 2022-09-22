import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
    const  params = useParams()
    useEffect(() => {
        console.log(params.myId)
    }, [])
    return (
        <div>
           Detail 
        </div>
    )
}
