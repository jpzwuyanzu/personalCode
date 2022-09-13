import React, { Component } from 'react'
import withRouter from '../../components/withRouter'

 class FileItem extends Component {

    handleChangePage = (id) => {
        console.log(id)
        // this.props.history.push
        // this.props.history.mathch
        // this.props.history.location
        this.props.history.push(`/detail/${id}`)
    }

    render() {
        return (
            <li onClick={ () => { this.handleChangePage( this.props.filmId) } }>{ this.props.name }</li>
        )
    }
}

export default withRouter(FileItem)