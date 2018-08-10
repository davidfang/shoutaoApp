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
import CircleActions from '../Redux/CircleRedux'
import Toast from "../Lib/Toast";
// import { CircleSelectors } from '../Redux/CircleRedux'
function *requestFaild (response){
  let msg = ''
  switch (response.problem){
    case 'CLIENT_ERROR'://400-499任何非特定的400系列错误
      let message = response.data.message
      //console.log(typeof message)
      if(typeof message == "object") {
        for (let k in message) {
          msg += message[k].toString() + '\n'
        }
      }else{
        msg = message
      }
      yield put(CircleActions.circleFailure(msg))
      break;
    case 'SERVER_ERROR'://500-599任何500系列错误
      msg = '500系列错误'
      yield put(CircleActions.circleFailure('500系列错误'))
      break;
    case 'TIMEOUT_ERROR'://服务器没有及时响应
      msg = '服务器超时'
      yield put(CircleActions.circleFailure('服务器超时'))
      break;
    case 'CONNECTION_ERROR'://服务器不可用，坏dns
      msg = '服务器不可用'
      yield put(CircleActions.circleFailure('服务器不可用'))
      break;
    case 'NETWORK_ERROR'://网络不可用
      msg = '网络不可用'
      yield put(CircleActions.circleFailure('网络不可用'))
      break;
    case 'CANCEL_ERROR'://请求已被取消
      msg = '请求已被取消'
      yield put(CircleActions.circleFailure('请求已被取消'))
  }
  Toast.showError(msg,{})
}
export function * getCircle (api, action) {
  const { category_id,page } = action
  // get current data from Store
  // const currentData = yield select(CircleSelectors.getData)
  // make the call to the api
  const response = yield call(api.getCircle, category_id,page)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CircleActions.circleSuccess(category_id,response.data.data))
  } else {
    yield put(CircleActions.circleFailure(response))
    yield requestFaild(response)
  }
}
