import {takeLatest, all, takeEvery} from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux'
import {GithubTypes} from '../Redux/GithubRedux'
import {BannerTypes} from '../Redux/BannerRedux'
import {RegisterTypes} from '../Redux/RegisterRedux'
import {LoginTypes} from '../Redux/LoginRedux'
import {VerifyCodeTypes} from '../Redux/VerifyCodeRedux'
import {UserInfoTypes} from '../Redux/UserInfoRedux'
import {AccountTypes} from '../Redux/AccountRedux'
import {TbTypes} from '../Redux/TbRedux'
import {GoodsCategoryTypes} from '../Redux/GoodsCategoryRedux'
import {CircleTypes} from '../Redux/CircleRedux'

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas'
import {getUserAvatar} from './GithubSagas'
import {getRegister} from './RegisterSagas'
import {login,autoLogin,loginByMobileVerifyCode} from './LoginSagas'
import {getVerifyCode} from './VerifyCodeSagas'
import {getUserInfo,updateUserInfo,changePassword,setPassword,uploadAvatar} from './UserInfoSagas'
import {getAccount} from './AccountSagas'
import {getBanner} from './BannerSagas'
import {getTbIndexRecommend, getTbChannelProduct, getTbSearch, setTbDetail, getTbDetail} from './TbSagas'
import {getGoodsCategory} from './GoodsCategorySagas'
import {getCircle} from './CircleSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(RegisterTypes.REGISTER_REQUEST,getRegister,api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGIN_MOBILE_VERIFY_CODE_REQUEST, loginByMobileVerifyCode, api),
    takeLatest(LoginTypes.AUTO_LOGIN, autoLogin, api),
    takeLatest(VerifyCodeTypes.VERIFY_CODE_REQUEST, getVerifyCode, api),
    takeLatest(UserInfoTypes.USER_INFO_REQUEST,getUserInfo,api),
    takeLatest(UserInfoTypes.USER_INFO_UPDATE_REQUEST,updateUserInfo,api),
    takeLatest(UserInfoTypes.USER_INFO_CHANGE_PASSWORD_REQUEST,changePassword,api),
    takeLatest(UserInfoTypes.USER_INFO_SET_PASSWORD_REQUEST,setPassword,api),
    takeLatest(UserInfoTypes.UPLOAD_AVATAR_REQUEST,uploadAvatar,api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),

    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeEvery(BannerTypes.BANNER_REQUEST, getBanner, api),
    takeLatest(GoodsCategoryTypes.GOODS_CATEGORY_REQUEST, getGoodsCategory, api),
    takeLatest(TbTypes.TB_INDEX_RECOMMEND_REQUEST, getTbIndexRecommend, api),
    takeLatest(TbTypes.TB_CHANNEL_PRODUCT_REQUEST, getTbChannelProduct, api),
    takeLatest(TbTypes.TB_SEARCH_REQUEST, getTbSearch, api),
    takeLatest(TbTypes.TB_SET_DETAIL_REQUEST, setTbDetail, api),
    takeLatest(TbTypes.TB_DETAIL_REQUEST, getTbDetail, api),
    takeLatest(CircleTypes.CIRCLE_REQUEST,getCircle,api)
  ])
}
