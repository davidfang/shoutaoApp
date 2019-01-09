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

import {call, put, select} from 'redux-saga/effects'
import InviteActions from '../Redux/InviteRedux'
import {requestFaild} from "../Lib/Request"
import {LoginSelector} from "../Redux/LoginRedux";
// import { InviteSelectors } from '../Redux/InviteRedux'

const selectLoggedInStatus = (state) => LoginSelector.isLoggedIn(state.login)

export function* getInvite(api, action) {
  //const { data } = action
  // get current data from Store
  // const currentData = yield select(InviteSelectors.getData)
  // make the call to the api
  const isLoggedIn = yield select(selectLoggedInStatus)
  let response
  if (isLoggedIn) {//如果登录过了，设置一下token重新访问
     response = yield call(api.getInvite)
  } else {
     response = yield call(api.getInviteGuest)
  }
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(InviteActions.inviteSuccess(response.data.data))
  } else {
    yield requestFaild(response, InviteActions.inviteFailure)
  }
}
