import { all } from 'redux-saga/effects'
import watchSaga1 from '../saga/saga1'
import watchSaga2 from '../saga/saga2'
function *watchSaga() {
    yield all([watchSaga1(), watchSaga2()])
}

export default watchSaga