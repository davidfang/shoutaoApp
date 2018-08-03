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
import UserInfoActions from '../Redux/UserInfoRedux'
import {callApi} from './CallApiSaga'
// import { UserInfoSelectors } from '../Redux/UserInfoRedux'
function *requestFaild (response){
  switch (response.problem){
    case 'CLIENT_ERROR'://400-499任何非特定的400系列错误
      //yield put(UserInfoActions.userInfoFailure('400系列错误'))
      let message = response.data.message
      let msg = ''
      console.log(typeof message)
      if(typeof message == "object") {
        for (let k in message) {
          msg += message[k].toString() + '\n'
        }
      }else{
        msg = message
      }
      yield put(UserInfoActions.userInfoFailure(msg))
      break;
    case 'SERVER_ERROR'://500-599任何500系列错误
      yield put(UserInfoActions.userInfoFailure('500系列错误'))
      break;
    case 'TIMEOUT_ERROR'://服务器没有及时响应
      yield put(UserInfoActions.userInfoFailure('服务器超时'))
      break;
    case 'CONNECTION_ERROR'://服务器不可用，坏dns
      yield put(UserInfoActions.userInfoFailure('服务器不可用'))
      break;
    case 'NETWORK_ERROR'://网络不可用
      yield put(UserInfoActions.userInfoFailure('网络不可用'))
      break;
    case 'CANCEL_ERROR'://请求已被取消
      yield put(UserInfoActions.userInfoFailure('请求已被取消'))
  }
}
export function * getUserInfo (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(UserInfoSelectors.getData)
  // make the call to the api
  const response = yield call(api.getUserInfo, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(UserInfoActions.userInfoSuccess(response.data.data))
  } else {
    yield requestFaild(response)
  }
}

export function * updateUserInfo (api, action) {
  const { user } = action
  // get current data from Store
  // const currentData = yield select(UserInfoSelectors.getData)
  // make the call to the api
  const response = yield call(api.updateUserInfo, user)
  //const response = yield call(callApi, apiCall,api)

  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(UserInfoActions.userInfoSuccess(user))
  } else {
    yield requestFaild(response)
  }
}
