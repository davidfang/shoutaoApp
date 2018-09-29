import {call, put, select} from 'redux-saga/effects'
import {onEventWithMap} from '../Lib/UMAnalyticsUtil'
import LoginActions from '../Redux/LoginRedux'
import UserInfoActions from '../Redux/UserInfoRedux'
import {NavigationActions} from "react-navigation";
import {requestFaild} from '../Lib/Request'
//import { Actions as NavigationActions } from 'react-native-router-flux'
export const selectTokenInfo = (state) => state.login.tokenInfo
export const selectInvitationCode = (state) => state.register.invitation_code

// attempts to login
export function* login(api, {mobile, password}) {
  const authObj = {mobile, password}

  const response = yield call(api.login, authObj)
  onEventWithMap('login', {'type': '密码登录'})
  //console.log(response)
  // success?
  if (response.ok) { // 网络请求成功
    const {data} = response.data
    // 用户登录验证成功
    yield call(api.setAuthToken, data)
    yield put(LoginActions.loginSuccess(data))
    yield put(UserInfoActions.userInfoRequest())
    //NavigationActions.account()
    if (data.password) {
      yield put(NavigationActions.navigate({routeName: 'MainStack'}))
    } else {
      yield put(NavigationActions.navigate({routeName: 'SetPasswordScreen'}))
    }
  } else { // 网络请求失败
    yield requestFaild(response, LoginActions.loginFailure)
  }
}

export function* loginByMobileVerifyCode(api, {mobile, verifyCode}) {
  let authObj = {mobile, verifyCode}
  onEventWithMap('login', {'type': '验证码登录'})
  const response = yield call(api.loginByVerifyCode, authObj)

  //console.log(response)
  // success?
  if (response.ok) { // 网络请求成功
    const {data} = response.data
    // 用户登录验证成功
    yield call(api.setAuthToken, data)
    yield put(LoginActions.loginSuccess(data))
    yield put(UserInfoActions.userInfoRequest())
    //NavigationActions.account()
    console.log('data.password:', data.password)
    if (data.password) {
      yield put(NavigationActions.navigate({routeName: 'UserInfoScreen'}))
    } else {
      yield put(NavigationActions.navigate({'type': '用户注册', routeName: 'SetPasswordScreen'}))
    }
    onEventWithMap('loginByMobile', {'type': '用户登录', 'status': '验证码登录成功'})
  } else { // 网络请求失败
    onEventWithMap('loginByMobile', {'type': '用户登录', 'status': '验证码登录失败', 'haveInvitation': haveInvitation})
    yield requestFaild(response, LoginActions.loginFailure)
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

/**
 * 进来的时候，自动登录
 * @param api
 * @returns {IterableIterator<*>}
 */
export function* autoLogin(api) {
  const tokenInfo = yield select(selectTokenInfo)
  yield call(api.setAuthToken, tokenInfo)
}
