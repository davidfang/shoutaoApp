import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  inviteRequest: null,
  inviteSuccess: ['payload'],
  inviteFailure: ['error']
})

export const InviteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  payload: {},
  error: null
})

/* ------------- Selectors ------------- */

export const InviteSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>  state.merge({ fetching: true,  payload: {} })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state,{error} )=>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INVITE_REQUEST]: request,
  [Types.INVITE_SUCCESS]: success,
  [Types.INVITE_FAILURE]: failure
})
