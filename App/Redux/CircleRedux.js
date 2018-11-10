import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import unionBy from "lodash/unionBy";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  circleRequest: ['category_id', 'page'],
  circleSuccess: ['category_id', 'data'],
  circleFailure: ['error']
})

export const CircleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  more: {},
  nextPage: {},
  fetching: false,
  error: null
})

/* ------------- Selectors ------------- */

export const CircleSelectors = {
  getCircle: (state, category_id) => state.data.hasOwnProperty(category_id) ? state.data[category_id] : [],
  getMore: (state, category_id) => state.more.hasOwnProperty(category_id) ? state.more[category_id] : true,
  getNextPage: (state, category_id) => state.nextPage.hasOwnProperty(category_id) ? state.nextPage[category_id] : 1,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {category_id}) =>
  state.merge({fetching: true, payload: null})

// successful api lookup
export const success = (state, action) => {
  const {category_id, data} = action
  let more = data.length >= 20
  let newData
  let {data: oldData, more: oldMore, nextPage} = state
  if (oldMore.hasOwnProperty(category_id)) {
    oldMore[category_id] = more
  } else {
    oldMore = oldMore.merge({[category_id]: more})
  }
  if (nextPage.hasOwnProperty(category_id)) {
    nextPage[category_id] = more ? nextPage[category_id] + 1 : nextPage[category_id]
  } else {
    nextPage = nextPage.merge({
      [category_id]: more ? 2 : 1
    })
  }
  if (oldData.hasOwnProperty(category_id)) {
    newData = unionBy(oldData[category_id], data,'id')
  } else {
    newData = data
  }

  let circle = oldData.merge({[category_id]: newData})

  return state.merge({fetching: false, error: null, more: oldMore,nextPage, data: circle})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CIRCLE_REQUEST]: request,
  [Types.CIRCLE_SUCCESS]: success,
  [Types.CIRCLE_FAILURE]: failure
})
