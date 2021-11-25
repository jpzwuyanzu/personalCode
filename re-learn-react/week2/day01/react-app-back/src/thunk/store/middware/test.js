// eslint-disable-next-line import/no-anonymous-default-export
export default ({ dispatch, getState }) => {
    return next => {
        return action => {
            console.log('测试自定义中间件')
          return   next(action)
        }
    }
}