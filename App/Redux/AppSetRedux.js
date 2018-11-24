import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  appSetRequest: ['data'],
  appSetSuccess: ['payload'],
  appSetUpgradeRequest: ['platform', 'name', 'version'],
  appSetUpgradeSuccess: ['upgrade'],
  appSetNoticeRequest: null,
  appSetNoticeSuccess: ['notice'],
  appSetFailure: ['error']
})

export const AppSetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: {},
  upgrade: null,
  notice: [],
  error: null
})

/* ------------- Selectors ------------- */

export const AppSetSelectors = {
  getData: state => state.data,
  get: (state, key) => state.payload.hasOwnProperty(key) ? state.payload[key] : '',
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) =>
  state.merge({fetching: true, data, payload: {}})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}
// request the data from an api
export const upgradeRequest = (state, {platform, name, version}) =>
  state.merge({fetching: true})

// successful api lookup
export const upgradeSuccess = (state, action) => {
  const {upgrade} = action
  return state.merge({fetching: false, error: null, upgrade})
}
// request the data from an api
export const noticeRequest = (state) =>
  state.merge({fetching: true})

// successful api lookup
export const noticeSuccess = (state, action) => {
  const {notice} = action
  return state.merge({fetching: false, error: null, notice})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error, payload: {}})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APP_SET_REQUEST]: request,
  [Types.APP_SET_SUCCESS]: success,
  [Types.APP_SET_UPGRADE_REQUEST]: upgradeRequest,
  [Types.APP_SET_UPGRADE_SUCCESS]: upgradeSuccess,
  [Types.APP_SET_NOTICE_REQUEST]: noticeRequest,
  [Types.APP_SET_NOTICE_SUCCESS]: noticeSuccess,
  [Types.APP_SET_FAILURE]: failure
})
