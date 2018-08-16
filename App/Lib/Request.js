import { NavigationActions } from 'react-navigation';
import { call, put } from 'redux-saga/effects'
import Toast from '../Lib/Toast'

export function *requestFaild (response,failureAction){
  switch (response.problem){
    case 'CLIENT_ERROR'://400-499任何非特定的400系列错误
      //yield put(failureAction('400系列错误'))
      let message = response.data.message
      let msg = ''
      //console.log(typeof message)
      if(typeof message == "object") {
        for (let k in message) {
          msg += message[k].toString() + '\n'
        }
      }else{
        msg = message
      }
      yield put(failureAction(msg))
      Toast.showError(msg,{})
      break;
    case 'SERVER_ERROR'://500-599任何500系列错误
      yield put(failureAction('500系列错误'))
      Toast.showError('500系列错误',{})
      break;
    case 'TIMEOUT_ERROR'://服务器没有及时响应
      yield put(failureAction('服务器超时'))
      Toast.showError('服务器超时',{})
      break;
    case 'CONNECTION_ERROR'://服务器不可用，坏dns
      yield put(failureAction('服务器不可用'))
      Toast.showError('服务器不可用',{})
      break;
    case 'NETWORK_ERROR'://网络不可用
      yield put(failureAction('网络不可用'))
      Toast.showError('网络中断',{})
      break;
    case 'CANCEL_ERROR'://请求已被取消
      yield put(failureAction('请求已被取消'))
      Toast.showError('请求已被取消',{})
  }
}
