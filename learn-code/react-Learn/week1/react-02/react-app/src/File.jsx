import React, { Component, useRef } from 'react';
//非受控组件 input-type为file
class File extends Component {
     state = {
         img:''
     }
     constructor(props) {
        super(props)
        this.file = React.createRef()
     }
    hendlerChange() {
        const that = this;
        // const file = document.getElementById('file').files[0]
        // const file = this.refs.file.files[0]
        //获取dom节点
        const file = this.file.current.files[0]
        const reader =  new FileReader() //js中文件系统的一个对象
        reader.readAsDataURL(file) //转换成url地址，base64的地址
        reader.onload  = function(result) {
            that.setState({img: this.result})
        }
    }
    render() {
        return (
            <div>
                {/* <input type="file"  id="file" accept="image/*" onChange={ this.hendlerChange.bind(this) } /> */}
                <input type="file"  ref={ this.file } accept="image/*" onChange={ this.hendlerChange.bind(this) } />
                <img src={ this.state.img } alt="" style = {{width:'200px',height:'200px'}} />
            </div>
        );
    }
}

export default File;
