import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  qiniuRequest: null,
  qiniuAvatarRequest: null,
  qiniuFeedbackRequest: null,
  qiniuSuccess: ['token'],
  qiniuFailure: ['error']
})

export const QiniuTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  token: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const QiniuSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({fetching: true, token: null, data: null})

// successful api lookup
export const success = (state, action) => {
  const {token} = action
  return state.merge({fetching: false, error: null, token})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error, data: null, token: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.QINIU_REQUEST]: request,
  [Types.QINIU_AVATAR_REQUEST]: request,
  [Types.QINIU_FEEDBACK_REQUEST]: request,
  [Types.QINIU_SUCCESS]: success,
  [Types.QINIU_FAILURE]: failure
})
