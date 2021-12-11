import React from 'react';

const TimeShow = ({ regTime }) => {
    return (
        <>
        { regTime.split('/').join('-') }
        </>
    );
}

export default TimeShow;
