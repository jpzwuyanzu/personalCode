import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


export default function Loding() {
    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])
    return (<div></div>)
}
