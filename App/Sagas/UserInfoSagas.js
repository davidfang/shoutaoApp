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
import {NavigationActions} from 'react-navigation';
import {call, put} from 'redux-saga/effects'
import UserInfoActions from '../Redux/UserInfoRedux'
import LoginActions from '../Redux/LoginRedux'
import Toast from '../Lib/Toast'
import {requestFaild} from '../Lib/Request'

import {callApi} from './CallApiSaga'
// import { UserInfoSelectors } from '../Redux/UserInfoRedux'


/**
 * 获得用户信息
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* getUserInfo(api, action) {
  const {data} = action
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
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
}

/**
 * 修改用户信息
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* updateUserInfo(api, action) {
  const {user} = action
  // get current data from Store
  // const currentData = yield select(UserInfoSelectors.getData)
  // make the call to the api
  const response = yield call(api.updateUserInfo, user)
  //const response = yield call(callApi, apiCall,api)

  //console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    Toast.showSuccess('提交成功')
    yield put(UserInfoActions.userInfoSuccess(user))
    yield put(NavigationActions.navigate({routeName: 'UserInfoScreen'}))
  } else {
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
}

/**
 * 修改用户密码
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* changePassword(api, action) {
  const {user} = action
  // get current data from Store
  // const currentData = yield select(UserInfoSelectors.getData)
  // make the call to the api
  const response = yield call(api.changePassword, user)
  //const response = yield call(callApi, apiCall,api)

  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield call(api.removeAuthToken)
    yield put(LoginActions.logout())
    yield put(UserInfoActions.userInfoLogout())
    Toast.showSuccess('修改密码成功，请重新登录')
    yield put(NavigationActions.navigate({routeName: 'LoginScreen'}))
  } else {
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
}

/**
 * 设置用户密码 用户快捷注册时设置
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* setPassword(api, action) {
  const {user} = action
  // get current data from Store
  // const currentData = yield select(UserInfoSelectors.getData)
  // make the call to the api
  const response = yield call(api.setPassword, user)
  //const response = yield call(callApi, apiCall,api)

  //console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LoginActions.loginSetPassword())
    yield put(UserInfoActions.userInfoSetPasswordSuccess())
    Toast.showSuccess('密码设置成功，请填写个人信息')
    yield put(NavigationActions.navigate({routeName: 'EditUserScreen'}))
  } else {
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
}

/**
 * 上传头像
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* uploadAvatar(api, action) {
  const {fileUrl, fileName} = action
  let formData = new FormData()

  let file = {uri: fileUrl, type: 'application/octet-stream', name: fileName}
  formData.append('avatar', file)
  yield call(api.setFormData)
  const response = yield call(api.uploadAvatar, formData)

  //console.log(response)
  if (response.ok) { // success?
    //console.log('upload ok')
    yield call(api.setJsonData)
    Toast.showSuccess('头像上传成功')
    yield put(UserInfoActions.uploadAvatarSuccess(response.data.data.avatar))

  } else { // failure
    //console.log('upload error')
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
  yield put({type: 'UPLOAD AVATAR END'})
}
/**
 * 上传头像
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* uploadAvatarQiniu(api, action) {
  const {fileUrl, fileName,key,token} = action
  let formData = new FormData()

  let file = {uri: fileUrl, type: 'application/octet-stream', name: fileName}
  formData.append('file', file)
  formData.append('key', key)
  formData.append('token', token)
  formData.append("fname", fileName);
  yield call(api.setFormData)
  const response = yield call(api.uploadQiniu, formData)
  console.log(response)
  if (response.ok) { // success?
    //console.log('upload ok')
    yield call(api.setJsonData)
    Toast.showSuccess('头像上传成功')
    yield put(UserInfoActions.uploadAvatarSuccess(response.data.data.avatar))

  } else { // failure
    //console.log('upload error')
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
  yield put({type: 'UPLOAD AVATAR END'})
}

/**
 * 获得粉丝
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* getFans(api, action) {
  const {page} = action
  const response = yield call(api.getFans, page)
  //console.log(response)
  if (response.ok) { // success?
    let {data, current_page, last_page} = response.data
    let more = current_page < last_page
    yield put(UserInfoActions.fansSuccess(data, more))
  } else { // failure
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
}

/**
 * 获得推荐粉丝
 * @param api
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* getGrandFans(api, action) {
  const {page} = action
  const response = yield call(api.getGrandFans, page)
  //console.log(response)
  if (response.ok) { // success?
    let {data, current_page, last_page} = response.data
    let more = current_page < last_page
    yield put(UserInfoActions.grandFansSuccess(data, more))
  } else { // failure
    yield requestFaild(response, UserInfoActions.userInfoFailure)
  }
}
