import React, { useEffect } from 'react'
import ProductList from './../components/ProductList'
import { connect } from 'dva'

function Product({ dispatch, prolist }) {
    useEffect(() => {
        dispatch({
            type: 'products/getProlistFn'
        })
    }, [])
    return (
        <div>
            <ProductList prolist={ prolist } />
        </div>
    )
}

export default connect(
    ({ products: { prolist }}) => {
        // console.log(obj)
        return {
            prolist
        }
    }
)(Product)