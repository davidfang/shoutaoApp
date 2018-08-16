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
import {requestFaild} from '../Lib/Request'
// import { CircleSelectors } from '../Redux/CircleRedux'

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
    let {data,current_page,last_page} = response.data
    let more = current_page < last_page
    yield put(CircleActions.circleSuccess(category_id,data,more))
  } else {
    //yield put(CircleActions.circleFailure(response))
    yield requestFaild(response,CircleActions.circleFailure)
  }
}
