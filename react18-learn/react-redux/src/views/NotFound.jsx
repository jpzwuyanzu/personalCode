import React, { useEffect } from 'react'

const NotFound = (props) => {
    useEffect(() => {
        console.log(props)
    }, [])
    return (
        <div>
            404
        </div>
    )
}

export default NotFound
