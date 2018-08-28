import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  accountRequest: null,
  accountSuccess: ['accountInfo'],
  accountFailure: ['error'],
  bankInfoRequest: null,
  bankInfoSuccess: ['bankInfo'],
  bankInfoSetRequest: ['bankInfo'],
  withdrawalRequest: ['withdrawal'],
  withdrawalFinished: null,
  accountLogout: null
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  bankInfo: null,
  accountInfo: null,
  fetching: false,
  error: null
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getInfo: state => state.accountInfo,
  getBankInfo: state => state.bankInfo
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({fetching: true})

// successful api lookup
export const success = (state, action) => {
  const {accountInfo} = action
  return state.merge({fetching: false, error: null, accountInfo})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error})
export const logout = (state) => INITIAL_STATE

export const bankInfoSuccess = (state, {bankInfo}) => state.merge({fetching: false, error: null, bankInfo})
export const bankInfoSetRequest = state => state.merge({fetching: true})
export const finished = state => state.merge({fetching: false, error: null})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_LOGOUT]: logout,
  [Types.BANK_INFO_REQUEST]: request,
  [Types.BANK_INFO_SUCCESS]: bankInfoSuccess,
  [Types.BANK_INFO_SET_REQUEST]: bankInfoSetRequest,
  [Types.WITHDRAWAL_REQUEST]: request,
  [Types.WITHDRAWAL_FINISHED]: finished,

})
