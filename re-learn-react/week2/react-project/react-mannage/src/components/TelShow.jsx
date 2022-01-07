import React, { useState } from 'react';

const TelShow = ({ tel }) => {

    const [flag, setFlag] = useState(true)

    return (
        <>
        {
            flag ? <span style={{ color: 'yellowgreen' }} onClick={ () => {
                setFlag(false)
            } }>
                { tel.slice(0, 3) }****{ tel.slice(7, 10) }
                </span>
                 : 
                <span onClick={ () => {
                    setFlag(true)
                } }>{ tel }</span>
        }
        
        </>
    );
}

export default TelShow;
