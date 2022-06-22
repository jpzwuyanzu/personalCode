import React, { Component } from 'react'

 class App extends Component {

    myRef = React.createRef()
    state = {
        list: [
            {
                id: 1,
                text: 'aaa'
            },
            {
                id: 2,
                text: 'bbbb'
            },
            {
                id: 3,
                text: 'ccc'
            }
        ]
    }

    handleClick = () => {
        //不要直接修改状态， 可能会造成不可预期的问题
        // this.state.list.push(this.myRef.current.value)
        let newList = [...this.state.list]
        newList.push({ id: Math.random()*100000, text: this.myRef.current.value })

        this.setState({
            list: newList
        })
    }

    handelDelClick = (id, index) => {
        let newList = this.state.list.slice()
        newList.splice(index, 1)
        this.setState({
            list: newList
        })
    }
    render() {
        return (
            <div>
                <input ref={ this.myRef }/>
                <button onClick={ () => { this.handleClick() } }>add</button>
                <ul>
                    { this.state.list.map((item, index) => 
                    <li key={ item.id }>{ item.text }
                    <button onClick={ () => { 
                        this.handelDelClick(item.id, index)
                    } }>del</button>
                    </li>) 
                    }
                </ul>
            </div>
        )
    }
}

export default App;
