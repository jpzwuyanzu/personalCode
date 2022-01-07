import React from 'react';
 function formatDate(time)  {
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds(); 
    return Y+M+D+h+m+s;
}

const TimeShow = ({ time }) => {
    return (
        <>
         <span>{ formatDate(time*1) }</span>
        </>
    );
}

export default TimeShow;
