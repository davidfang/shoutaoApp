import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import unionBy from 'lodash/unionBy'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  userInfoRequest: null,
  userInfoSuccess: ['user'],
  userInfoFailure: ['error'],
  userInfoLogout: null,
  userInfoUpdateRequest: ['user'],
  userInfoChangePasswordRequest: ['user'],
  userInfoSetPasswordRequest: ['user'],
  userInfoSetPasswordSuccess: null,
  uploadAvatarRequest: ['fileUrl', 'fileName'],
  uploadAvatarSuccess: ['avatar'],
  fansRequest: ['page'],
  fansSuccess: ['fans', 'more'],
  grandFansRequest: ['page'],
  grandFansSuccess: ['fans', 'more']
})

export const UserInfoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
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
  invitation_code: '0000001',
  fans: [],
  fansMore: true,
  fansNextPage: 1,
  grandFans: [],
  grandFansNextPage: 1,
  grandFansMore: true
})

/* ------------- Selectors ------------- */

export const UserInfoSelectors = {
  getError: state => state.error && state.error.toString()
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({fetching: true})

// successful api lookup
export const success = (state, action) => {
  const {user} = action
  return state.merge({fetching: false, error: null, ...user})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error})
export const logout = (state) => INITIAL_STATE
export const setPasswordSuccess = (state) => state.merge({fetching: false, error: null})
export const uploadAvatarSuccess = (state, data) => {
  const {avatar} = data
  return state.merge({error: null, fetching: false, avatar, avatarData: avatar})
}
export const fansSuccess = (state, {fans, more}) => state.merge({
  fetching: false, error: null,
  fansMore: more,
  fansNextPage: more ? state.fansNextPage + 1 : state.fansNextPage,
  fans: unionBy(state.fans, fans, 'id')
})
export const grandFansSuccess = (state, {fans, more}) => state.merge({
  fetching: false, error: null,
  grandFansMore: more,
  grandFansNextPage: more ? state.grandFansNextPage + 1 : state.grandFansNextPage,
  grandFans: unionBy(state.grandFans, fans, 'id')
})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_INFO_REQUEST]: request,
  [Types.USER_INFO_SUCCESS]: success,
  [Types.USER_INFO_FAILURE]: failure,
  [Types.USER_INFO_LOGOUT]: logout,
  [Types.USER_INFO_UPDATE_REQUEST]: request,
  [Types.USER_INFO_CHANGE_PASSWORD_REQUEST]: request,
  [Types.USER_INFO_SET_PASSWORD_REQUEST]: request,
  [Types.USER_INFO_SET_PASSWORD_SUCCESS]: setPasswordSuccess,
  [Types.UPLOAD_AVATAR_REQUEST]: request,
  [Types.UPLOAD_AVATAR_SUCCESS]: uploadAvatarSuccess,
  [Types.FANS_REQUEST]: request,
  [Types.FANS_SUCCESS]: fansSuccess,
  [Types.GRAND_FANS_REQUEST]: request,
  [Types.GRAND_FANS_SUCCESS]: grandFansSuccess,

})
