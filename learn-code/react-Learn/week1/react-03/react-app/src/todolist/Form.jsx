import React, { Component } from 'react';

class Form extends Component {
    state = {
        keyword:''
    }
    constructor(props) {
        super(props)
        this.input = React.createRef()
    }
    handlerChange(){
        this.setState({
            keyword:this.input.current.value
        })
    }
    handlerKeyUp(e){
        if(e.keyCode === 13) {
            this.props.onReceiveChange(this.state.keyword)
            //非受控组件中能用dom操作莱控制value值，通过状态不会生效
            // this.setState({keyword:''})
            this.input.current.value = ''
        }
    }
    render() {
        return (
            <div>
               <input type="text" 
               ref = { this.input } 
               onChange={ this.handlerChange.bind(this) }
               onKeyUp = { this.handlerKeyUp.bind(this) }
               />
            </div>
        );
    }
}

export default Form;
