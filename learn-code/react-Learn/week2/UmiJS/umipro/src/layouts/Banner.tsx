import React from 'react'
interface Props {
    children?: any
}

function App (props: Props) {

    return (
        <div>
           Banner 主界面布局
           { props.children }
        </div>
    )
}

export default App