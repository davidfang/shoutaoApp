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

import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import UserInfoActions from '../Redux/UserInfoRedux'
import LoginActions from '../Redux/LoginRedux'
import {NavigationActions} from "react-navigation";
// import { RegisterSelectors } from '../Redux/RegisterRedux'

export function * getRegister (api, action) {
  const { user } = action
  // get current data from Store
  // const currentData = yield select(RegisterSelectors.getData)
  // make the call to the api
  const response = yield call(api.getRegister, user)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const {status, data} = response.data
    if (status) {
      yield put(RegisterActions.registerSuccess(data))
      yield call(api.setAuthToken, data)
      yield put(LoginActions.loginSuccess(data))
      yield put(UserInfoActions.userInfoRequest())

      yield put(NavigationActions.navigate({routeName:'MainStack'}))
    } else {
      yield put(RegisterActions.registerFailure(data.message))
      // yield put(RegisterActions.registerFailure(response.data))
    }

  } else {
    switch (response.problem){
      case 'CLIENT_ERROR'://400-499任何非特定的400系列错误
        yield put(RegisterActions.registerFailure('400系列错误'))
        let message = response.data.message
        let msg = ''
        if(typeof message == Object) {
          for (let k in message) {
            msg += message[k].toString() + '\n'
          }
        }else{
          msg = message
        }
        yield put(RegisterActions.registerFailure(msg))
        break;
      case 'SERVER_ERROR'://500-599任何500系列错误
        yield put(RegisterActions.registerFailure('500系列错误'))
        break;
      case 'TIMEOUT_ERROR'://服务器没有及时响应
        yield put(RegisterActions.registerFailure('服务器超时'))
        break;
      case 'CONNECTION_ERROR'://服务器不可用，坏dns
        yield put(RegisterActions.registerFailure('服务器不可用'))
        break;
      case 'NETWORK_ERROR'://网络不可用
        yield put(RegisterActions.registerFailure('网络不可用'))
        break;
      case 'CANCEL_ERROR'://请求已被取消
        yield put(RegisterActions.registerFailure('请求已被取消'))
    }
  }
}
