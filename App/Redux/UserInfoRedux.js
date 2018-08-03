import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userInfoRequest: null,
  userInfoSuccess: ['user'],
  userInfoFailure: ['error'],
  userInfoLogout: null,
  userInfoUpdateRequest: ['user'],
})

export const UserInfoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
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
  invitation_code: null
})

/* ------------- Selectors ------------- */

export const UserInfoSelectors = {
  getError: state => state.error && state.error.toString(),
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { user } = action
  return state.merge({ fetching: false, error: null, ...user })
}

// Something went wrong somewhere.
export const failure = (state,{error} )=>
  state.merge({ fetching: false, error })
export const logout = (state) => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_INFO_REQUEST]: request,
  [Types.USER_INFO_SUCCESS]: success,
  [Types.USER_INFO_FAILURE]: failure,
  [Types.USER_INFO_LOGOUT]: logout,
  [Types.USER_INFO_UPDATE_REQUEST]:request
})
