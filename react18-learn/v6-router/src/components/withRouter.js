import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

export default function withRouter(Component) {
    return function(props) {
        const push = useNavigate()
        const location = useLocation()
        const match = useParams()

        return <Component a="1" { ...props } history={{ push, location, match }} />
    }
}


// widthRouter(FilmItem)