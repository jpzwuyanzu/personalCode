import React, { useState } from 'react'

export default function App() {

    const [name, setName] = useState<string>('test')

    return (
        <div>
            app---{ name.substring(0,1).toUpperCase() + name.substring(1) }
            <button onClick={ () => {
                setName('xiaoming')
            } }>click</button>
        </div>
    )
}
