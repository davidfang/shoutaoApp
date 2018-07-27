import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { BannerTypes } from '../Redux/BannerRedux'
import { TbTypes } from '../Redux/TbRedux'
import { GoodsCategoryTypes } from '../Redux/GoodsCategoryRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getBanner } from './BannerSagas'
import { getTbIndexRecommend,getTbChannelProduct,getTbSearch, getTbDetail } from './TbSagas'
import { getGoodsCategory } from './GoodsCategorySagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeEvery(BannerTypes.BANNER_REQUEST, getBanner, api),
    takeLatest(GoodsCategoryTypes.GOODS_CATEGORY_REQUEST, getGoodsCategory, api),
    takeLatest(TbTypes.TB_INDEX_RECOMMEND_REQUEST, getTbIndexRecommend, api),
    takeLatest(TbTypes.TB_CHANNEL_PRODUCT_REQUEST, getTbChannelProduct, api),
    takeLatest(TbTypes.TB_SEARCH_REQUEST, getTbSearch, api),
    takeLatest(TbTypes.TB_DETAIL_REQUEST, getTbDetail, api)
  ])
}
