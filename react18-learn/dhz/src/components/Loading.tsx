import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function Loading() {
    useEffect(() => {
        NProgress.configure({ showSpinner: false });
        NProgress.start()
        return () => {
            NProgress.done()
        }
    } ,[])
    return (
        <div>
            
        </div>
    )
}
