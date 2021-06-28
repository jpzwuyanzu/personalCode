import React, { useState, useMemo } from 'react'

function useFormatList(list){
    return useMemo(() => list.map(item=>{
        console.log(1111)
        return item.toUpperCase()
    }), [list])
}


function  ChangeUpCase ({ list }){

    const [number, setNumber] = useState(0)
    const newlist = useFormatList(list)

    return (
        <div>
    <div className="list" >
       { newlist.map(item=><div key={item} >{ item }</div>) }
     </div>
     <div className="number" >
         <div>{ number }</div>
         <button onClick={()=> setNumber(number + 1) } >add</button>
     </div>
</div>
    )
}

export default ChangeUpCase
