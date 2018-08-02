import { call, put, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'
//import { Actions as NavigationActions } from 'react-native-router-flux'
export const selectTokenInfo = (state) => state.login.tokenInfo

// attempts to login
export function * login (api, {mobile, password}) {
  const authObj = {mobile, password}

  const response = yield call(api.login, authObj)

  // console.log(response)
  // success?
  if (response.ok) { // 网络请求成功
    const data = response.data
    if (data.status) { // 用户登录验证成功
      yield call(api.setAuthToken, data.data)
      yield put(LoginActions.loginSuccess(data.data))
      yield put(AccountActions.accountRequest())
      //NavigationActions.account()
      yield put({type: 'RELOGIN_OK'})
    } else {
      yield put(LoginActions.loginFailure(response))
      yield put(LoginActions.loginFailure('WRONG'))
    }
  } else { // 网络请求失败
    yield put(LoginActions.loginFailure('NET_WRONG'))
    yield put(LoginActions.loginFailure('网络请求失败'))
  }
}

export function * loginRefresh (api) {
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
// loads the login
export function * loginLoad (api) {
  const tokenInfo = yield select(selectTokenInfo)
  // only set the token if we have it
  if (tokenInfo !== null) {
    yield call(api.setAuthToken, tokenInfo)
    const response = yield call(api.getAccount)

    if (response.ok) {
      const data = response.data
      if (data.status) { // 用户登录验证成功
        // yield put(PasswordActions.changePasswordFailure(data))

        yield call(api.setAuthToken, authToken)
        yield put(LoginActions.loginLoadSuccess())
        yield put(AccountActions.accountUpdateSuccess(response.data.data))
      } else {
        yield put(LoginActions.loginFailure('LOGIN-WRONG'))
        // yield put(LoginActions.loginFailure(data))

        yield put(LoginActions.logout())
      }
    } else {
      yield put(LoginActions.loginFailure('NET-WRONG'))

      yield put(LoginActions.logout())
    }
  }
}
