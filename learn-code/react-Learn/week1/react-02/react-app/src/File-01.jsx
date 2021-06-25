import React, { Component } from 'react';
//非受控组件 input-type为file
class File extends Component {
     state = {
         img:''
     }
    hendlerChange() {
        const that = this;
        const file = document.getElementById('file').files[0]
        const reader =  new FileReader() //js中文件系统的一个对象
        reader.readAsDataURL(file) //转换成url地址，base64的地址
        reader.onload  = function(result) {
            that.setState({img: this.result})
        }
    }
    render() {
        return (
            <div>
                <input type="file"  id="file" accept="image/*" onChange={ this.hendlerChange.bind(this) } />
                <img src={ this.state.img } alt="" style = {{width:'200px',height:'200px'}} />
            </div>
        );
    }
}

export default File;
