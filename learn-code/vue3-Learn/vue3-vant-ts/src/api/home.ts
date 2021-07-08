import request from '../util/request'
export function getHomeData(params?: any) {
    return request.post('/userInfo.json', params)
}

export function getMovieList(params?: any) {
    return request.get('/movieList/', { params })
}