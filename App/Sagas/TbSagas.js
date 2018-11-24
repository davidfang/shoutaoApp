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
import {requestFaild} from '../Lib/Request'
import {call, put, select} from 'redux-saga/effects'
import TbActions, {TbSelectors} from '../Redux/TbRedux'
import {LoginSelector} from "../Redux/LoginRedux";

const selectLoggedInStatus = (state) => LoginSelector.isLoggedIn(state.login)
export const indexRecommendPageNo = (state) => TbSelectors.getIndexRecommendPageNo(state.tb)
export const channelProductPageNo = (state, channelId) => TbSelectors.getChannelProductPageNo(state.tb, channelId)
export const searchPageNo = (state, keyWord) => TbSelectors.getSearchPageNo(state.tb, keyWord)

export function* getTbIndexRecommend(api, action) {
  // const {page} = action
  const page = yield select(indexRecommendPageNo)
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTbIndexRecommend, page)
  // yield put(TbActions.tbFailure(response, response))
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      yield put(TbActions.tbIndexRecommendSuccess(response.data.data))
    } else {
      yield requestFaild(response, TbActions.tbFailure)
    }
  } else {
    yield requestFaild(response, TbActions.tbFailure)
  }
}

export function* getTbChannelProduct(api, action) {
  const {channelId, sortId} = action
  const page = yield select(channelProductPageNo, channelId)
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTbChannelProduct, channelId, sortId, page)
  // yield put(TbActions.tbFailure(response, response))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      yield put(TbActions.tbChannelProductSuccess(channelId, response.data.data))
    } else {
      yield requestFaild(response, TbActions.tbFailure)
    }
  } else {
    yield requestFaild(response, TbActions.tbFailure)
  }
}

export function* getTbSearch(api, action) {
  //const {page} = action
  const {keyWord, sortId} = action
  const page = yield select(searchPageNo, keyWord)
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTbSearchKeyWord, keyWord, page, sortId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      yield put(TbActions.tbSearchSuccess(keyWord, response.data.data))
    } else {
      yield requestFaild(response, TbActions.tbFailure)
    }
  } else {
    yield requestFaild(response, TbActions.tbFailure)
  }
}

export function* getTbDetail(api, action) {
  const {goodsId} = action
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTbDetail, goodsId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      const {smallImages, detailImages, guessLike} = response.data.data
      yield put(TbActions.tbDetailSuccess(goodsId, smallImages, detailImages, guessLike, response.data.data))
    } else {
      yield requestFaild(response, TbActions.tbFailure)
    }
  } else {
    yield requestFaild(response, TbActions.tbFailure)
  }
}

export function* setTbDetail(api, action) {
  const {num_iid, detail} = action

  const response = yield call(api.setTbDetail, num_iid, detail)

  console.log(response)
  if (response.ok) {
    if (response.data.status) {
      yield put(TbActions.tbSetDetail(num_iid, response.data.data))
    } else {//失败时不处理

    }
  } else {//失败时不处理

  }

}

export function* getTpwd(api, action) {
  const {num_iid} = action
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const isLoggedIn = yield select(selectLoggedInStatus)
  let response
  if (isLoggedIn) {//登录用户
    response = yield call(api.getTpwd, num_iid)
  } else {//未登录用户
    response = yield call(api.getDTpwd, num_iid)
  }

  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      yield put(TbActions.tbTpwdSuccess(num_iid, response.data.data.tpwd))
    } else {
      yield requestFaild(response, TbActions.tbFailure)
    }
  } else {
    yield requestFaild(response, TbActions.tbFailure)
  }
}

/**
 * 提交淘口令购买
 * @param api
 * @param action
 * @returns {IterableIterator<*|CallEffect>}
 */
export function* postTpwdBuy(api, action) {
  const {tpwd} = action
  const response = yield call(api.postTpwdBuy, tpwd)

  console.log(response)

}
