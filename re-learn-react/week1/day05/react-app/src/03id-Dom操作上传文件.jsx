import React, { Component } from 'react'

export default class File extends Component {
    state = {
        img: ''
    }
    handlerChange() {
        const that = this;
        // console.log(document.getElementById('file').files[0])
        const file = document.getElementById('file').files[0]
        const reader = new FileReader() // js中文件系统的对象
        reader.readAsDataURL(file) 
        reader.onload = function(result) {
            // console.log(this.result)
            that.setState({
                img: this.result
            })
        }
    }
    render() {
        return (
            <div>
                <input type="file" id="file" onChange = { this.handlerChange.bind(this) }/>
                <img src={ this.state.img } alt=""/>
            </div>
        )
    }
}
