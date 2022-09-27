
import { call, put, takeEvery } from 'redux-saga/effects'
/**
 *redux-saga：页面组件中发出dispatch， take监听action ，fork同步执行异步处理函数
 *call()发送异步请求，并拿到结果， 最后在put中将异步结果成功发送到reducer中处理
 */
// function *watchSaga1() {
//     // while(true) {
//     //     //使用take 监听组件发来的action
//     //     yield take('get-list1');
//     //     //fork 非阻塞调用的形式执行fn函数
//     //     yield fork(getList1);
//     // }
//     yield takeEvery('get-list1', getList1)
// }

function *getList1() {
    //异步处理

    // call函数发送异步请求, call(接收的是返回周是promise对象函数)
    // call会阻塞式的调用fn函数
    let res = yield call(getListAction1);
    //put函数在异步成功之后发送新的action，非阻塞式执行action
    yield put({
        type: 'change-list1',
        payload: res
    });
}

function getListAction1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['1111','2222','3333','4444'])
        },2000)
    })
}

// export default watchSaga1
export { getList1 }