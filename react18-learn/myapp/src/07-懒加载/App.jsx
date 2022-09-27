import React, { useState, Suspense } from 'react'
// import Comingsoon from './components/Comingsoon'
// import Nowplaying from './components/Nowplaying'
/**
 * 基于webpack代码分割方案实现的代码懒加载
 * React.lazy()需要配合着Suspense组件一起使用
 */
const Nowplaying = React.lazy(() => import('./components/Nowplaying'));
const Comingsoon = React.lazy(() => import('./components/Comingsoon'));

export default function App() {
    const [type, setType] = useState(1)
    return (
        <div>
            <button onClick={ () => {
                setType(1)
            } }>正在热映</button>
            <button onClick={ () => {
                setType(2)
            } }>即将上映</button>
            <Suspense fallback={<div>...加载中</div> }>
            {
                type === 1 ? <Nowplaying></Nowplaying> : <Comingsoon></Comingsoon>
            }
            </Suspense>
        </div>
    )
}