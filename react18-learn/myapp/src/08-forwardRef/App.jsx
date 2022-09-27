import React, {forwardRef, useRef} from 'react'

export default function App() {
    const myText = useRef(null)
    return (
        <div>
            <button onClick={ () => {
                console.log(myText)
                myText.current.value="";
                myText.current.focus()
            } }>click</button>
            <Com ref={ myText } />
        </div>
    )
}

const Com = forwardRef((props, ref) => {
    return(
        <div>
            <input type="text" ref={ ref } defaultValue="11111"/>
        </div>
    )
})
