/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { hide  } from './../06-Redux/redux/actionCreator/tabbarActionCreator'

const Detail = ({ hide }) =>  {
    const { myid } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        hide()
    }, [myid])
    return (
        <div>
            详情--{ myid }
            <button onClick={ () => { navigate('/detail/1000') } }>猜你喜欢</button>
        </div>
    )
}
// connect(params1, params2)(Detail)
/**
 * 参数1代表mapStateToProps： 传递给组件的
 * 参数2代表mapDispatchToProps： 传递给组件的回调函数
 */
//  const mapDispatchToProps = (dispatch) => {
//     return {
//       hideTab() {
//         dispatch({
//             type: 'hide'
//         })
//       },
//       showTab() {
//         dispatch({
//             type: 'show'
//         })
//       },
//     };
//   };
// export default connect(null, mapDispatchToProps)(Detail)
export default connect(null, { hide })(Detail)