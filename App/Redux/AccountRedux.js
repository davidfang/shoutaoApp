import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  accountRequest: null,
  accountSuccess: ['user'],
  accountFailure: null,
  accountLogout: null,
  accountUpdateRequest: ['user']

})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  id: null,
  name: null,
  email: null,
  nickname: null,
  mobile: null,
  age: 0,
  gender: "0",
  avatar: null,
  grade: "0",
  invitation_code: null,
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>  state.merge({fetching: true,  payload: null})

// successful api lookup
export const success = (state, action) => {
  const {user} = action
  return state.merge({fetching: false, error: null, ...user})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error, payload: null})
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_LOGOUT]: logout,
  [Types.ACCOUNT_UPDATE_REQUEST]:request
})
