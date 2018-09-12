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
import AccountActions from '../Redux/AccountRedux'
import {requestFaild} from '../Lib/Request'
import {NavigationActions} from "react-navigation";
import Toast from "../Lib/Toast";
import UserInfoActions from "../Redux/UserInfoRedux";
// import { AccountSelectors } from '../Redux/AccountRedux'

export function * getAccount (api, action) {
  // get current data from Store
  // const currentData = yield select(AccountSelectors.getData)
  // make the call to the api
  const response = yield call(api.getAccount)

  //console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AccountActions.accountSuccess(response.data.data))
  } else {
    yield requestFaild(response,AccountActions.accountFailure)
  }
}

export function * getBankInfo(api, action) {
  const response = yield call(api.getBankInfo)
  //console.log(response)
  if(response.ok){
    yield put(AccountActions.bankInfoSuccess(response.data.data))
  }else{
    yield requestFaild(response,AccountActions.accountFailure)
  }

}

export function * setBankInfo(api, action) {
  const {bankInfo} = action
  const response = yield call(api.setBankInfo,bankInfo)
  //console.log(response)
  if(response.ok){
    yield put(AccountActions.bankInfoSuccess(bankInfo))
    Toast.showSuccess('绑定成功,可以提现了')
    yield put(NavigationActions.navigate({routeName: 'UserInfoScreen'}))
  }else{
    yield requestFaild(response,AccountActions.accountFailure)
  }
}

export function * withdrawal(api,action) {
  const {withdrawal} = action
  const response = yield call(api.withdrawal,withdrawal)
  console.log(response)
  if(response.ok){
    yield put(AccountActions.withdrawalFinished())
    yield put(AccountActions.accountRequest())//重新请求用户帐户信息
    Toast.showSuccess('提现请求已收到，请耐心等待')
    yield put(NavigationActions.navigate({routeName: 'UserInfoScreen'}))
  }else{
    yield requestFaild(response,AccountActions.accountFailure)
  }
}
