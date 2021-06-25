import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom'

const MayLike = withRouter((props) => {

    const [likelist, setLikelist] = useState([])


    useEffect(() => {
        fetch('/likeList.json').then(res => res.json()).then(result => {
            setLikelist(result.result)
        })
    }, [])

    const goToDetail = (e, item) => {
        console.log(item)
        console.log(props)
        props.history.push('/home/homeDetail', { params: item.proid })
    }

  return (
    <>
    {
        likelist.map(item => {
            return (
                <div className="proItem" key={item.proid} onClick={ (e) => { goToDetail(e, item) } }>
                <img className="proImg" src={item.proimg} alt="" />
                <div className="pro-Desc">
                <div className="title">{item.desc_title}</div>
                <div className="content">{item.desc_content}</div>
                <div className="price">
                    <span className="num-pri">{item.sell_price}</span>
                    <span className="pri-color">元</span>
                    <span className="place-pri">门市价:</span>
                    <span className="place-num">{item.place_pri}元</span>
                    <span className="sell-mount">已售{item.sell_momunt}</span>
                </div>
                </div>
            </div>
            )
        })
    }
    </>
  );
});

export default MayLike;
