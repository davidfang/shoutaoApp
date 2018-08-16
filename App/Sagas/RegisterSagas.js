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
import {requestFaild} from '../Lib/Request'
import Toast from "../Lib/Toast";
// import { RegisterSelectors } from '../Redux/RegisterRedux'

export function * getRegister (api, action) {
  const { user } = action
  // get current data from Store
  // const currentData = yield select(RegisterSelectors.getData)
  // make the call to the api
  const response = yield call(api.getRegister, user)
  //console.log(response)
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

      Toast.showSuccess('注册成功，请填写个人信息')
      yield put(NavigationActions.navigate({routeName:'EditUserScreen'}))
    } else {
      yield put(RegisterActions.registerFailure(data.message))
      // yield put(RegisterActions.registerFailure(response.data))
    }

  } else {
    yield requestFaild(response,RegisterActions.registerFailure)
  }
}
