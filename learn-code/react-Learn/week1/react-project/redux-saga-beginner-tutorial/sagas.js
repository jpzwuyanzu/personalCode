import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'

export function* helloSaga() {
    console.log('hello saga')
}


// our worker Saga 将执行异步的increment任务
export function* incrementAsync() {
    yield delay(1000)
    yield put({type:'INCREMENT'})
}

//our Watcher Saga 监听所有的INCREMENT_ASYNC action, 并在action匹配的时候执行incrementAsync
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
} 


export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}