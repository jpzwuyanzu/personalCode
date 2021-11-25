
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ dispatch, getState }) => {
    return next => {
        return action => {
            console.log('121212', getState())
          return  next(action)
        }
    }
} 