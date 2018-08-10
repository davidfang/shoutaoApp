import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import union from "lodash/union";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  circleRequest: ['category_id','page'],
  circleSuccess: ['category_id','data'],
  circleFailure: ['error']
})

export const CircleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  more:{},
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CircleSelectors = {
  getCircle: (state,category_id) => state.data.hasOwnProperty(category_id)? state.data[category_id]:[],
  getMore: (state,category_id) => state.more.hasOwnProperty(category_id)? state.more[category_id]:true,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { category_id }) =>
  state.merge({ fetching: true,  payload: null })

// successful api lookup
export const success = (state, action) => {
  const { category_id, data } = action
  let newData
  let {data:oldData,more} = state
  if(more.hasOwnProperty(category_id)){
    more[category_id] = !(data.length < 20)
  }else{
    more = more.merge({[category_id]:!(data.length < 20)})
  }
  if(oldData.hasOwnProperty(category_id)){
    newData = union(oldData[category_id], data)
  }else{
    newData = data
  }

  let circle = oldData.merge({[category_id]:newData})

  return state.merge({ fetching: false, error: null,more, data:circle })
}

// Something went wrong somewhere.
export const failure = (state,{error}) =>
  state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CIRCLE_REQUEST]: request,
  [Types.CIRCLE_SUCCESS]: success,
  [Types.CIRCLE_FAILURE]: failure
})
