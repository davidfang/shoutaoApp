import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  goodsCategoryRequest: null,
  goodsCategorySuccess: ['payload'],
  goodsCategoryFailure: ['payload']
})

export const GoodsCategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: false,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GoodsCategorySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({fetching: true, payload: null})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, data: payload, payload})
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: true, payload, data: []})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GOODS_CATEGORY_REQUEST]: request,
  [Types.GOODS_CATEGORY_SUCCESS]: success,
  [Types.GOODS_CATEGORY_FAILURE]: failure
})
