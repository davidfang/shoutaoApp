import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  shareRequest: ['data'],
  shareSuccess: ['payload'],
  shareLoginRequest: ['data'],
  shareLoginSuccess: ['thirdLogin'],
  shareBindRequest: ['data'],
  shareBindSuccess: ['thirdLogin'],
  shareFailure: null
})

export const ShareTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: {},
  thirdLogin: {},
  error: null
})

/* ------------- Selectors ------------- */

export const ShareSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: {} })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}
// request the data from an api
export const loginRequest = (state, { data }) =>
  state.merge({ fetching: true, data,thirdLogin:{} })

// successful api lookup
export const loginSuccess = (state, action) => {
  const { thirdLogin } = action
  return state.merge({ fetching: false, error: null, thirdLogin })
}
// request the data from an api
export const bindRequest = (state, { data }) =>
  state.merge({ fetching: true, data,thirdLogin:{} })

// successful api lookup
export const bindSuccess = (state, action) => {
  const { thirdLogin } = action
  return state.merge({ fetching: false, error: null, thirdLogin })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHARE_REQUEST]: request,
  [Types.SHARE_SUCCESS]: success,
  [Types.SHARE_LOGIN_REQUEST]: loginRequest,
  [Types.SHARE_LOGIN_SUCCESS]: loginSuccess,
  [Types.SHARE_BIND_REQUEST]: bindRequest,
  [Types.SHARE_BIND_SUCCESS]: bindSuccess,
  [Types.SHARE_FAILURE]: failure
})
