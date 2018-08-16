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

import {call, put,select} from 'redux-saga/effects'
import BannerActions from '../Redux/BannerRedux'
import Toast from "../Lib/Toast";
import {requestFaild} from '../Lib/Request'
import UserInfoActions from "../Redux/UserInfoRedux";
import {NavigationActions} from "react-navigation";

// import { BannerSelectors } from '../Redux/BannerRedux'
const selectUserId = (state) => state.userInfo.hasOwnProperty('id') ? state.userInfo.id : null

export function* getBanner(api, {banner_type}) {
  //const { data } = action
  // get current data from Store
  // const currentData = yield select(BannerSelectors.getData)
  // make the call to the api
  const response = yield call(api.getBanner, banner_type)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const {status, data} = response.data
    if (status) { // 用户登录验证成功
      yield put(BannerActions.bannerSuccess(data, banner_type))
    } else {
      yield put(BannerActions.bannerFailure(data))
    }
  } else {
    requestFaild(response,BannerActions.bannerFailure)
  }
}

/**
 * 提交用户反馈
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* postFeedBack(api, action) {
  const {body, fileUrl, fileName} = action

  let formData = new FormData()

  let file = {uri: fileUrl, type: 'application/octet-stream', name: fileName}
  formData.append('image', file)
  formData.append('body', body)
  let userId = yield select(selectUserId)
  formData.append('userId',userId)
  yield call(api.setFormData)
  const response = yield call(api.feedBack, formData)

  console.log(response)
  if (response.ok) { // success?
    console.log('upload ok')
    Toast.showSuccess('意见提交成功')
    yield put(NavigationActions.back())
  } else { // failure
    console.log('upload error')
    yield put({type: 'UPLOAD feedback Fail'})
    console.log(response)
    requestFaild(response,BannerActions.bannerFailure)
  }
  yield put({type: 'UPLOAD feedback END'})
}
