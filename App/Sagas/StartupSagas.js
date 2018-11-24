import {call, put, select} from 'redux-saga/effects'
import LoginActions, {LoginSelector} from '../Redux/LoginRedux'

import AppSetActions from '../Redux/AppSetRedux'
import BannerActions from '../Redux/BannerRedux'
import GoodsCategoryActions from "../Redux/GoodsCategoryRedux";
import AppConfig from '../Config/AppConfig'
// exported to make available for tests
const selectLoggedInStatus = (state) => LoginSelector.isLoggedIn(state.login)
const getTokenInfo = (state) => LoginSelector.tokenInfo(state.login)
const selectLoginFetchingStatus = (state) => state.login.fetching

// process STARTUP actions
export function* startup(action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectLoggedInStatus
    })

    // fully customized!
    const subObject = {a: 1, b: [1, 2, 3], c: true}
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup
      }
    })
  }
  const isLoggedIn = yield select(selectLoggedInStatus)
  if (isLoggedIn) {//如果登录过了，设置一下token重新访问
    yield put(LoginActions.autoLogin())

  } else {
    const selectLoginFetching = yield select(selectLoginFetchingStatus)
    if (selectLoginFetching) {
      yield put(LoginActions.logout())
    }
  }

  yield put(AppSetActions.appSetUpgradeRequest(AppConfig.platform, AppConfig.appName, AppConfig.appVersion))
  yield put(AppSetActions.appSetNoticeRequest())

  // only get if we don't have it yet
  yield put(AppSetActions.appSetRequest(''))
  yield put(BannerActions.bannerRequest('swiper'))
  yield put(BannerActions.bannerRequest('recommend'))
  yield put(BannerActions.bannerRequest('bestSelling'))
  yield put(GoodsCategoryActions.goodsCategoryRequest())
}
