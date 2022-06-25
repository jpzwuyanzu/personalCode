import React from 'react'

const SideBar = ({ bg, position }) => {
    //函数式组件没有this
    let obj1 = {
        left: 0
    }
    let obj2 = {
        right: 0
    }
    let obj =  { 
        background: bg, 
        width: '200px', 
        position: 'fixed'
        }
    let styleObj = position === 'left' ? { ...obj, ...obj1 } : { ...obj, ...obj2 }
    return (
        <div style={ styleObj }>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
            </ul>
        </div>
    )
}

// SideBar.defaultProps //函数式默认属性
// SideBar.propsTypes //函数式属性校验

export default SideBar;