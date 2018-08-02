import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  verifyCodeRequest: ['mobile'],
  verifyCodeSuccess: ['payload'],
  verifyCodeFailure: ['message']
})

export const VerifyCodeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  mobile: null,
  fetching: null,
  payload: null,
  error: null,
  message:null
})

/* ------------- Selectors ------------- */

export const VerifyCodeSelectors = {
  getMobile: state => state.mobile
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { mobile }) =>
  state.merge({ fetching: true, mobile, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state,{message} )=>
  state.merge({ fetching: false, error: true,message, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERIFY_CODE_REQUEST]: request,
  [Types.VERIFY_CODE_SUCCESS]: success,
  [Types.VERIFY_CODE_FAILURE]: failure
})
