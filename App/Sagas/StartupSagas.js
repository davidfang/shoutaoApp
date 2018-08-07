import { call ,put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { is } from 'ramda'
import LoginActions,{LoginSelector} from  '../Redux/LoginRedux'

import BannerActions from '../Redux/BannerRedux'
import TbActions from '../Redux/TbRedux'
import GoodsCategoryActions from "../Redux/GoodsCategoryRedux";

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar
const selectLoggedInStatus = (state) => LoginSelector.isLoggedIn(state.login)
const getTokenInfo = (state) => LoginSelector.tokenInfo(state.login)
const selectLoginFetchingStatus = (state) => state.login.fetching
// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar
      }
    })
  }
  const isLoggedIn = yield select(selectLoggedInStatus)
  if (isLoggedIn) {//如果登录过了，设置一下token重新访问
    yield put(LoginActions.autoLogin())

  }else{
    const selectLoginFetching = yield select(selectLoginFetchingStatus)
    if(selectLoginFetching){
      yield put(LoginActions.logout())
    }
  }

  const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }
  yield put(BannerActions.bannerRequest('swiper'))
  yield put(BannerActions.bannerRequest('recommend'))
  yield put(GoodsCategoryActions.goodsCategoryRequest())
  // yield put(TbActions.tbIndexRecommendRequest(1))
}
