import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import unionBy from "lodash/unionBy";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  orderRequest: ['status', 'page'],
  orderSuccess: ['status', 'data'],
  orderFailure: null,
  orderLogout: null
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: false,
  payload: null,
  status: 1,//订单状态 默认为1
  pageNo: {'1': 1, '12': 1, '3': 1, '13': 1},
  more: {'1': true, '12': true, '3': true, '13': true},
  error: null
})

/* ------------- Selectors ------------- */

export const OrderSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {status, page}) =>
  state.merge({fetching: true, status,  payload: null})

// successful api lookup
export const success = (state, action) => {
  const {status, data} = action
  let newData = unionBy(state.data, data, 'trade_id')
  let more = data.length == 20 //更多
  let newMore = {...state.more, [status]: more}
  let pageNo = more ? (state.pageNo[status] + 1 ): state.pageNo[status]
  let newPageNo = {...state.pageNo, [status]: pageNo}
return state.merge({fetching: false, error: null, status, more: newMore, pageNo: newPageNo, data: newData})
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null})
export const logout =  state => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_REQUEST]: request,
  [Types.ORDER_SUCCESS]: success,
  [Types.ORDER_FAILURE]: failure,
  [Types.ORDER_LOGOUT]: logout
})
