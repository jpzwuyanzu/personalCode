import React, { Component } from 'react'

export default class File extends Component {
    state = {
        img: ''
    }

    constructor(props) {
        super(props)
        this.file = React.createRef()
    }

    handlerChange() {
        const that = this;
        // const file = document.getElementById('file').files[0] //使用id
        // const file = this.refs.file.files[0]  //直接使用ref
        const file = this.file.current.files[0]  //使用createRef的方式
        const reader = new FileReader() // js中文件系统的对象
        reader.readAsDataURL(file) 
        reader.onload = function(result) {
            that.setState({
                img: this.result
            })
        }
    }
    render() {
        return (
            <div>
                {/* <input type="file" id="file" onChange = { this.handlerChange.bind(this) }/> */}
                {/* <input type="file" ref="file" onChange = { this.handlerChange.bind(this) }/> */}
                <input type="file" ref={ this.file } onChange = { this.handlerChange.bind(this) }/>
                <img src={ this.state.img } alt=""/>
            </div>
        )
    }
}
