import React, { forwardRef, useRef } from 'react';

const Child = forwardRef((props, ref) => {
    console.log(ref)
    return(
        <div ref={ref}>{ ref.current }</div>
    )
})

const ForwardRef = () => {

    const parentRef = useRef('111')
    const parentRef2 = useRef('222')
    return (
        <div>
            <Child ref={parentRef} />
            <Child ref={parentRef2} />
        </div>
    );
}

export default ForwardRef;
