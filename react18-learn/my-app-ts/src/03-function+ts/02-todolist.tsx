import React, { useRef, useState } from 'react'

export default function App() {
    const myRef = useRef<HTMLInputElement>(null);
    const [list, setList] = useState<string[]>([])

    return (
        <div>
            <input type="text" ref={ myRef }/>
            <button onClick={ () => {
                // console.log(myRef.current?.value)
                console.log((myRef.current as HTMLInputElement).value)
                setList([...list, (myRef.current as HTMLInputElement).value])
            } }>click</button>
            <ul>
                {
                    list.map((item, index) => <li key={ index }>{ item }</li>)
                }
            </ul>
        </div>
    )
}
