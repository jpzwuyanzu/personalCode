import React, { useState } from 'react'

const App = () =>  {

    const [name, setName] = useState('test')
    const [age, setAge] = useState(100)

    return (
        <div>
            <button onClick={ () => {
                setName('xiaoming')
                setAge(10)
            } }>button</button>
            app-{ name } - { age }
        </div>
    )
}


export default App