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
import AppSetActions, {upgradeRequest} from '../Redux/AppSetRedux'
import {requestFaild} from '../Lib/Request'

// import { AppSetSelectors } from '../Redux/AppSetRedux'

export function* getAppSet(api, action) {
  const {data} = action
  // get current data from Store
  // const currentData = yield select(AppSetSelectors.getData)
  // make the call to the api
  const response = yield call(api.getAppSet, data)
  //console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AppSetActions.appSetSuccess(response.data.data))
  } else {
    yield requestFaild(response, AppSetActions.appSetFailure)
  }
}

export function* getAppSetUpgrade(api, action) {
  const {platform, name, version} = action
  // get current data from Store
  // const currentData = yield select(AppSetSelectors.getData)
  // make the call to the api
  const response = yield call(api.getAppUpgrade, platform, name, version)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    if (response.data.hasOwnProperty('data')) {
      yield put(AppSetActions.appSetUpgradeSuccess(response.data.data))
    } else {
      //无需升级
    }
  } else {//无需提示
    //yield requestFaild(response, AppSetActions.appSetFailure)
  }
}

export function* getAppSetNotice(api, action) {
  //const {} = action
  // get current data from Store
  // const currentData = yield select(AppSetSelectors.getData)
  // make the call to the api
  const response = yield call(api.getNotice)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    if (response.data.hasOwnProperty('data')) {
      yield put(AppSetActions.appSetNoticeSuccess(response.data.data))
    } else {
      //无消息
    }
  } else {
    yield requestFaild(response, AppSetActions.appSetFailure)
  }
}
