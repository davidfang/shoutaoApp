import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import lodash from 'lodash'
import union from 'lodash/union'
import { normalize, schema } from 'normalizr'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  tbRequest: ['data'],
  tbSuccess: ['payload'],
  tbFailure: ['error', 'payload'],
  tbInit: null,
  tbIndexRecommendRequest: null,
  tbIndexRecommendSuccess: ['payload'],
  tbIndexRecommendFailure: ['error', 'payload'],
  tbChannelProductRequest: ['channelId', 'sortId'],
  tbChannelProductSuccess: ['channelId', 'payload'],
  tbSearchRequest: ['keyWord', 'sortId'],
  tbSearchSuccess: ['keyWord', 'payload'],
  tbSetDetailRequest: ['num_iid','detail'],
  tbSetDetail: ['num_iid','detail'],
  tbDetailRequest: ['num_iid'],
  tbDetailSuccess: ['num_iid', 'smallImages', 'detailImages', 'guessLike', 'payload'],
  tbDetailFailure: ['error', 'payload'],
  tbTpwdRequest: ['num_iid'],
  tbTpwdSuccess: ['num_iid','tpwd'],
  tbBuyRequest: ['num_iid'],
  tbBuySuccess: null,
  tbTpwdBuyRequest: ['tpwd']
})

export const TbTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  productLists: {}, // 产品表
  productSmallImages: {}, // 产品小图 轮播
  productDetailImages: {}, // 产品详情图
  productGuessLike: {}, // 产品推荐关联
  indexRecommend: [], // 首页推荐产品集
  indexRecommendPageNo: 1, // 首页推荐产品集 页码 里面对应频道 {1:10,2:8}
  indexRecommendMore: true, // 首页推荐产品集是否有更多
  channelProductPageNo: {}, // 频道产品集 页码
  channelProductMore: {}, // 频道产品集是否有更多 里面对应频道 {1:true,2:false}
  channelProduct: {}, // 频道产品集 {1:[{...},{...}],2:[{...},{...}]}
  categoryProductMore: {}, // 分类产品集是否有更多 里面对应分类 {1:true,2:false}
  categoryProduct: {}, // 分类产品集 {1:[{...},{...}],2:[{...},{...}]}
  searchKeyWord: null, // 搜索关键词
  searchResult: [], // 搜索结果
  searchPageNo: 1, // 搜索页码
  searchMore: true, // 搜索更多
  fetching: false,
  payload: {},
  error: null
})

/* ------------- Selectors ------------- */

export const TbSelectors = {
  getData: state => state.data,
  getProductLists: state => state.productLists, // 选择产品列表
  getIndexRecommendPageNo: state => state.indexRecommendPageNo,// 选择首页推荐产品页码
  getIndexRecommendIds: state => state.indexRecommend, // 选择首页推荐ID列表
  getIndexRecommendPrds: state => { // 选择首页推荐产品列表
    return state.indexRecommend.length ? state.indexRecommend.map(id => state.productLists[id]) : []
  },
  getChannelProductPageNo: (state, channelId) => { // 选择频道推荐产品页码
    return state.channelProductPageNo.hasOwnProperty(channelId) ? state.channelProductPageNo[channelId] : 1
  },
  getAllChannelProductIds: state => state.channelProduct,// 获得所有频道产品列表
  getChannelProductIds: (state, channelId) => { // 选择频道推荐ID列表
    return state.channelProduct.hasOwnProperty(channelId) ? state.channelProduct[channelId] : []
  },
  getChannelProductPrds: (state, channelId) => { // 选择频道推荐产品列表
    return state.channelProduct.hasOwnProperty(channelId) ? state.channelProduct[channelId].map(id => state.productLists[id]) : []
  },
  getSearchPageNo: (state, keyWord) => { // 选择搜索页码
    if (state.searchKeyWord == keyWord) {
      return state.searchPageNo
    } else {
      return 1
    }
  },
  getSearchKeyWordIds: state => state.searchResult, // 选择搜索获得的ID列表
  getSearchKeyWordPrds: (state, keyWord) => { // 选择搜索获得的产品列表
    //return state;
    return state.searchResult.length ? state.searchResult.map(id => state.productLists[id]) : []
  },
  // 获得产品小图 轮播图
  getSmallImages: (state, num_iid) => state.productSmallImages.hasOwnProperty(num_iid) ? state.productSmallImages[num_iid] : [],
  // 获得产品详情图
  getDetailImages: (state, num_iid) => state.productDetailImages.hasOwnProperty(num_iid) ? state.productDetailImages[num_iid] : [],
  // 获得产品相关推荐产品的ID列表
  getGuessLikeIds: (state, num_iid) => state.productGuessLike.hasOwnProperty(num_iid) ? state.productGuessLike[num_iid] : [],
  // 获得产品相关推荐产品的数据列表
  getGuessLikePrds: (state, num_iid) => {
    let ids = TbSelectors.getGuessLikeIds(state, num_iid)
    return ids.length ? ids.map(id => state.productLists[id]) : []
  },
  getProductInfo: (state, productId) => state.productLists.hasOwnProperty(productId) ? state.productLists[productId] : null
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) => state.merge({fetching: true, data, payload: {}})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}

// Something went wrong somewhere.
export const tbInit = state => INITIAL_STATE
export const failure = (state, { error}) =>
  state.merge({fetching: false, error})

// request the data from an api
export const indexRecommendRequest = (state) =>
  state.merge({fetching: true, payload: {}})

// successful api lookup
export const indexRecommendSuccess = (state, action) => {
  const {payload} = action
  const productSchema = new schema.Entity('items', {}, {idAttribute: 'num_iid'})
  const productsData = normalize(payload, [productSchema])
  const {entities: {items}, result} = productsData
  const productLists = Object.assign({}, items, state.productLists)

  return state.merge({
    fetching: false,
    error: null,
    productLists,
    indexRecommendPageNo: state.indexRecommendPageNo + 1,
    indexRecommendMore: result.length == 20,
    indexRecommend: union(state.indexRecommend, result),
    payload
  })
}

// request the data from an api
export const channelProductRequest = (state, {channelId, sortId}) =>
  state.merge({fetching: true, payload: {}})

// successful api lookup
export const channelProductSuccess = (state, action) => {
  const {channelId, payload} = action
  const productSchema = new schema.Entity('items', {}, {idAttribute: 'num_iid'})
  const productsData = normalize(payload, [productSchema])
  const {entities: {items}, result} = productsData
  const productLists = Object.assign({}, items, state.productLists)

  const channelProductMore = state.channelProductMore.merge({[channelId]: result.length == 20})
  const channelProductPageNoNew = state.channelProductPageNo.hasOwnProperty(channelId) ? (state.channelProductPageNo[channelId] + 1) : 2
  const channelProductPageNo = state.channelProductPageNo.merge({[channelId]: channelProductPageNoNew})
  let channelProductNew = state.channelProduct.hasOwnProperty(channelId) ? union(state.channelProduct[channelId], result) : result
  const channelProduct = state.channelProduct.merge({[channelId]: channelProductNew})

  return state.merge({
    fetching: false,
    error: null,
    productLists,
    channelProductPageNo,
    channelProductMore,
    channelProduct,
    payload
  })
}
export const searchRequest = (state, {keyWord, sortId}) => {
  if (keyWord != state.searchKeyWord) {
    return state.merge({
      fetching: true,
      searchKeyWord: keyWord,
      searchPageNo: 1,
      searchMore: true,
      searchResult: [],
      payload: {}
    })
  } else {
    return state.merge({fetching: true, payload: {}})
  }
}
// successful api lookup
export const searchSuccess = (state, action) => {
  const {keyWord, payload} = action
  const productSchema = new schema.Entity('items', {}, {idAttribute: 'num_iid'})
  const productsData = normalize(payload, [productSchema])
  const {entities: {items}, result} = productsData
  const productLists = Object.assign({}, items, state.productLists)

  return state.merge({
    fetching: false,
    error: null,
    productLists,
    searchPageNo: state.searchPageNo + 1,
    searchMore: result.length == 20,
    searchResult: union(state.searchResult, result),
    payload
  })
}
// Something went wrong somewhere.
export const indexRecommendFailure = (state, {payload, error}) =>
  state.merge({fetching: false, error, payload})

// request the data from an api
export const tbDetailRequest = (state, {num_iid}) =>
  state.merge({fetching: true, payload: {}})

// successful api lookup
export const tbDetailSuccess = (state, action) => {
  const {payload, num_iid, smallImages, detailImages, guessLike} = action

  // 处理推荐产品
  const productSchema = new schema.Entity('items', {}, {idAttribute: 'num_iid'})
  const productsData = normalize(guessLike, [productSchema])
  const {entities: {items}, result} = productsData
  const productLists = Object.assign({}, items, state.productLists)

  return state.merge({
    fetching: false,
    error: null,
    payload,
    productLists,
    productSmallImages: Object.assign({}, state.productSmallImages, {[num_iid]: smallImages}),
    productDetailImages: Object.assign({}, state.productDetailImages, {[num_iid]: detailImages}),
    productGuessLike: Object.assign({}, state.productGuessLike, {[num_iid]: result})
  })
}
export const tpwdBuyRequest = (state,{tpwd}) => state
/**
 * 设置产品详情
 * @param state
 * @param action
 * @returns {*}
 */
export const tbSetDetail = (state, action) => {
  const {num_iid,detail} = action
  const productLists = lodash.defaultsDeep({[num_iid]:{detail:detail}},state.productLists)
  return state.merge({fetching: false, error: null,productLists})
  return lodash.defaultsDeep({fetching: false, error: null,productLists:{[num_iid]:{detail:detail}}},state)
}

// Something went wrong somewhere.
export const tbDetailFailure = state =>
  state.merge({fetching: false, error: true, payload: null})
// request the data from an api
export const tbTpwdRequest = (state, {num_iid}) =>
  state.merge({fetching: true, payload: {}})

// successful api lookup
export const tbTpwdSuccess = (state, action) => {
  const {num_iid, tpwd} = action

  // const productLists = lodash.defaultsDeep({[num_iid]:{tpwd:tpwd}},state.productLists)
  const productLists = lodash.defaultsDeep({[num_iid]:{...tpwd}},state.productLists)
  return state.merge({fetching: false, error: null,productLists})
}
// request the data from an api
export const tbBuyRequest = (state, {num_iid}) =>
  state.merge({fetching: true, payload: {}})

// successful api lookup
export const tbBuySuccess = (state, action) => state.merge({fetching: false, error: null})
export const tbTpwdBuyRequest = (state,{tpwd}) => state
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TB_REQUEST]: request,
  [Types.TB_SUCCESS]: success,
  [Types.TB_FAILURE]: failure,
  [Types.TB_INIT]: tbInit,
  [Types.TB_INDEX_RECOMMEND_REQUEST]: indexRecommendRequest,
  [Types.TB_INDEX_RECOMMEND_SUCCESS]: indexRecommendSuccess,
  [Types.TB_INDEX_RECOMMEND_FAILURE]: indexRecommendFailure,
  [Types.TB_CHANNEL_PRODUCT_REQUEST]: channelProductRequest,
  [Types.TB_CHANNEL_PRODUCT_SUCCESS]: channelProductSuccess,
  [Types.TB_SEARCH_REQUEST]: searchRequest,
  [Types.TB_SEARCH_SUCCESS]: searchSuccess,
  [Types.TB_SET_DETAIL_REQUEST]: request,
  [Types.TB_SET_DETAIL]: tbSetDetail,
  [Types.TB_DETAIL_REQUEST]: tbDetailRequest,
  [Types.TB_DETAIL_SUCCESS]: tbDetailSuccess,
  [Types.TB_DETAIL_FAILURE]: tbDetailFailure,
  [Types.TB_TPWD_REQUEST]: tbTpwdRequest,
  [Types.TB_TPWD_SUCCESS]: tbTpwdSuccess,
  [Types.TB_BUY_REQUEST]: tbBuyRequest,
  [Types.TB_BUY_SUCCESS]: tbBuySuccess,
  [Types.TB_TPWD_BUY_REQUEST]: tbTpwdBuyRequest,

})
