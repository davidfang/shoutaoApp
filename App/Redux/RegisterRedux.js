import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  registerRequest: ['user'],
  registerSuccess: ['payload'],
  registerFailure: ['error'],
  setInvitationCode:['code']
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  invitation_code:null
})

/* ------------- Selectors ------------- */

export const RegisterSelectors = {
  getData: state => state.data,
  getError: state => state.error && state.error.toString(),
  getInvitationCode: state => state.invitation_code
}

/* ------------- Reducers ------------- */
export const setInvitationCode = (state,{code}) => state.merge({invitation_code:code})
// request the data from an api
export const request = (state, {user}) =>
  state.merge({fetching: true, data:user, payload: null})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
  [Types.SET_INVITATION_CODE]: setInvitationCode
})
