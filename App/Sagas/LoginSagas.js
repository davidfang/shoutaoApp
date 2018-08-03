import {call, put, select} from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import UserInfoActions from '../Redux/UserInfoRedux'
//import { Actions as NavigationActions } from 'react-native-router-flux'
export const selectTokenInfo = (state) => state.login.tokenInfo

function* requestFaild(response) {
  switch (response.problem) {
    case 'CLIENT_ERROR'://400-499任何非特定的400系列错误
      //yield put(LoginActions.loginFailure('400系列错误'))
      let message = response.data.message
      let msg = ''
      console.log(typeof message)
      if (typeof message == "object") {
        for (let k in message) {
          msg += message[k].toString() + '\n'
        }
      } else {
        msg = message
      }
      yield put(LoginActions.loginFailure(msg))
      break;
    case 'SERVER_ERROR'://500-599任何500系列错误
      yield put(LoginActions.loginFailure('500系列错误'))
      break;
    case 'TIMEOUT_ERROR'://服务器没有及时响应
      yield put(LoginActions.loginFailure('服务器超时'))
      break;
    case 'CONNECTION_ERROR'://服务器不可用，坏dns
      yield put(LoginActions.loginFailure('服务器不可用'))
      break;
    case 'NETWORK_ERROR'://网络不可用
      yield put(LoginActions.loginFailure('网络不可用'))
      break;
    case 'CANCEL_ERROR'://请求已被取消
      yield put(LoginActions.loginFailure('请求已被取消'))
  }
}

// attempts to login
export function* login(api, {mobile, password}) {
  const authObj = {mobile, password}

  const response = yield call(api.login, authObj)

  console.log(response)
  // success?
  if (response.ok) { // 网络请求成功
    const data = response.data
    // 用户登录验证成功
    yield call(api.setAuthToken, data.data)
    yield put(LoginActions.loginSuccess(data.data))
    yield put(UserInfoActions.userInfoRequest())
    //NavigationActions.account()
    yield put({type: 'RELOGIN_OK'})
  } else { // 网络请求失败
    yield requestFaild(response)
  }
}

export function* loginRefresh(api) {
  const authToken = yield select(selectTokenInfo)
  if (authToken !== null) {
    const authObj = 'refresh_token=' + authToken.refresh_token + '&grant_type=refresh_token'
    const response = yield call(api.login, authObj)

    // success?
    if (response.ok) {
      yield call(api.setAuthToken, response.data.access_token)
      yield put(LoginActions.loginSuccess(response.data))
    } else {
      yield put(LoginActions.loginFailure('WRONG'))
    }
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

export function* autoLogin(api) {
  const tokenInfo = yield select(selectTokenInfo)
  yield call(api.setAuthToken, tokenInfo)
}
