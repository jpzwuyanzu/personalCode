import React, { useState } from 'react';

const App = () => {
    const [ count, setCount ] = useState(0)
    //React保证了每次运行useEffect 的时候，DOm已经更新完毕了
    return (
        <div>
           <p>you cliked { count } times</p> 
           <button onClick = { () => setCount(prevCount => prevCount + 1) }>
               Click Me
           </button>
        </div>
    );
}

export default App;
