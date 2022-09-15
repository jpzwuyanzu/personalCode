import axios from 'axios'
function getCinemaListAction(value) {
    return (dispatch) => {
        return new Promise(resolve => {
            axios({
                url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=7834489',
                headers: {
                    "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
                    "X-Host": "mall.film-ticket.cinema.list"
                }
            }).then(res => {
                dispatch({
                    type: 'change-list',
                    payload: res.data.data.cinemas
                }) 
                resolve(res.data.data.cinemas)
            }).catch(err => {
                console.log(err)
            })
        })
    }
}

export {
    getCinemaListAction
}
