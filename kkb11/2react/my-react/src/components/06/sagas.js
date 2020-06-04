import { call, put, takeEvery } from "redux-saga/effects"

import { UserService } from "../../api/api"

function* login(action) {
    try{
        yield put({type: 'requestLogin'})
        //调用
        const result = yield call(UserService.login, action.uname)
        yield put({type: 'loginSuccess', result})
    }catch(message) {
        yield put({ type: 'loginFailure', payload: message })
    }
}

function* mySaga() {
    yield takeEvery('login', login)
}

export default mySaga

