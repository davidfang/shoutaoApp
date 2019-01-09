/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import {call, put} from 'redux-saga/effects'
import ShareActions from '../Redux/ShareRedux'
import UserInfoActions from '../Redux/UserInfoRedux'
import LoginActions from "../Redux/LoginRedux";
import {NavigationActions} from "react-navigation";
import {onEventWithMap} from "../Lib/UMAnalyticsUtil";

// import { ShareSelectors } from '../Redux/ShareRedux'

export function* postShare(api, action) {
  const {data} = action
  // get current data from Store
  // const currentData = yield select(ShareSelectors.getData)
  // make the call to the api
  const response = yield call(api.postShare, data)

  //console.log(response)
  console.warn(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ShareActions.shareSuccess(response.data))
  } else {
    yield put(ShareActions.shareFailure())
  }
}

export function* thirdLogin(api, action) {
  const {data} = action

  const response = yield call(api.thirdLoginAndBind, data)


  console.warn(response)
  if (response.ok) {
    const loginResult = response.data.data
    const {bind} = loginResult
    yield put(ShareActions.shareLoginSuccess(loginResult))//修改三方登录成功的信息
    if (bind) {//用户已经绑定
      // 用户登录成功
      yield call(api.setAuthToken, loginResult.loginInfo)
      yield put(LoginActions.loginSuccess(loginResult.loginInfo))
      yield put(UserInfoActions.userInfoRequest())
      //NavigationActions.account()
      console.log('data.password:', loginResult.loginInfo.password)
      //if (loginResult.loginInfo.password) {//已经设置过密码
        yield put(NavigationActions.navigate({routeName: 'UserInfoScreen'}))
      //} else {//未设置过密码
       // yield put(NavigationActions.navigate({'type': '用户注册', routeName: 'SetPasswordScreen'}))
      //}
    } else {//用户未绑定
      yield put(NavigationActions.navigate({
        'type': '三方登录绑定手机',
        routeName: 'BindMobileScreen',
        params: {
          thirdLoginId: loginResult.thirdLoginId,
          uid: loginResult.uid,
          platform: loginResult.platform
        }
      }))
    }
  } else {
    yield put(ShareActions.shareFailure())
  }
}

export function* thirdBind(api, action) {
  const {data} = action

  const response = yield call(api.thirdBind, data)


  //console.warn(response)
  if (response.ok) {
    let loginInfo = response.data.data
    yield put(ShareActions.shareBindSuccess(loginInfo))
    // 用户登录成功
    yield call(api.setAuthToken, loginInfo)
    yield put(LoginActions.loginSuccess(loginInfo))
    yield put(UserInfoActions.userInfoRequest())

    if (loginInfo.password) {
      yield put(NavigationActions.navigate({routeName: 'UserInfoScreen'}))

    } else {
      yield put(NavigationActions.navigate({'type': '用户注册', routeName: 'SetPasswordScreen'}))

    }
  } else {
    yield put(ShareActions.shareFailure())
  }
}
