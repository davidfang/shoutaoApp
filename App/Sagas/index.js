import {takeLatest, all, takeEvery} from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux'
import {AppSetTypes} from '../Redux/AppSetRedux'
import {BannerTypes} from '../Redux/BannerRedux'
import {RegisterTypes} from '../Redux/RegisterRedux'
import {LoginTypes} from '../Redux/LoginRedux'
import {VerifyCodeTypes} from '../Redux/VerifyCodeRedux'
import {UserInfoTypes} from '../Redux/UserInfoRedux'
import {AccountTypes} from '../Redux/AccountRedux'
import {TbTypes} from '../Redux/TbRedux'
import {GoodsCategoryTypes} from '../Redux/GoodsCategoryRedux'
import {CircleTypes} from '../Redux/CircleRedux'
import {QiniuTypes} from '../Redux/QiniuRedux'
import {ShareTypes} from '../Redux/ShareRedux'
import {InviteTypes} from '../Redux/InviteRedux'
import {OrderTypes} from '../Redux/OrderRedux'

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas'
import {getAppSet, getAppSetUpgrade, getAppSetNotice} from './AppSetSagas'
import {getRegister} from './RegisterSagas'
import {login, autoLogin, loginByMobileVerifyCode} from './LoginSagas'
import {getVerifyCode} from './VerifyCodeSagas'
import {
  getUserInfo,
  updateUserInfo,
  changePassword,
  setPassword,
  uploadAvatar,
  uploadAvatarQiniu,
  getFans,
  getGrandFans,
  invitationCodeSet
} from './UserInfoSagas'
import {getQiniuAvatarToken, getQiniuFeedbackToken} from './QiniuSagas'
import {getAccount, getBankInfo, setBankInfo, withdrawal} from './AccountSagas'
import {getBanner, postFeedBack} from './BannerSagas'
import {
  getTbIndexRecommend,
  getTbChannelProduct,
  getTbSearch,
  setTbDetail,
  getTbDetail,
  getTpwd,
  getBuy
} from './TbSagas'
import {getGoodsCategory} from './GoodsCategorySagas'
import {getCircle} from './CircleSagas'
import {postShare, thirdLogin, thirdBind} from './ShareSagas'
import {getInvite} from './InviteSagas'
import {getOrder} from './OrderSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const apiQiniu = DebugConfig.useFixtures ? FixtureAPI : API.create('http://upload.qiniup.com/')

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AppSetTypes.APP_SET_REQUEST, getAppSet, api),
    takeLatest(AppSetTypes.APP_SET_UPGRADE_REQUEST, getAppSetUpgrade, api),
    takeLatest(AppSetTypes.APP_SET_NOTICE_REQUEST, getAppSetNotice, api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(RegisterTypes.REGISTER_REQUEST, getRegister, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGIN_MOBILE_VERIFY_CODE_REQUEST, loginByMobileVerifyCode, api),
    takeLatest(LoginTypes.AUTO_LOGIN, autoLogin, api),
    takeLatest(VerifyCodeTypes.VERIFY_CODE_REQUEST, getVerifyCode, api),
    takeLatest(UserInfoTypes.USER_INFO_REQUEST, getUserInfo, api),
    takeLatest(UserInfoTypes.USER_INFO_UPDATE_REQUEST, updateUserInfo, api),
    takeLatest(UserInfoTypes.USER_INFO_CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserInfoTypes.USER_INFO_SET_PASSWORD_REQUEST, setPassword, api),
    takeLatest(UserInfoTypes.UPLOAD_AVATAR_REQUEST, uploadAvatar, api),
    takeLatest(UserInfoTypes.UPLOAD_AVATAR_QINIU_REQUEST, uploadAvatarQiniu, apiQiniu),
    takeLatest(UserInfoTypes.INVITATION_CODE_SET_REQUEST, invitationCodeSet, api),

    takeLatest(QiniuTypes.QINIU_AVATAR_REQUEST, getQiniuAvatarToken, api),
    takeLatest(QiniuTypes.QINIU_FEEDBACK_REQUEST, getQiniuFeedbackToken, api),

    takeLatest(UserInfoTypes.FANS_REQUEST, getFans, api),
    takeLatest(UserInfoTypes.GRAND_FANS_REQUEST, getGrandFans, api),
    takeLatest(BannerTypes.FEEDBACK_REQUEST, postFeedBack, apiQiniu),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.BANK_INFO_REQUEST, getBankInfo, api),
    takeLatest(AccountTypes.BANK_INFO_SET_REQUEST, setBankInfo, api),
    takeLatest(AccountTypes.WITHDRAWAL_REQUEST, withdrawal, api),

    takeEvery(BannerTypes.BANNER_REQUEST, getBanner, api),
    takeLatest(GoodsCategoryTypes.GOODS_CATEGORY_REQUEST, getGoodsCategory, api),
    takeLatest(TbTypes.TB_INDEX_RECOMMEND_REQUEST, getTbIndexRecommend, api),
    takeLatest(TbTypes.TB_CHANNEL_PRODUCT_REQUEST, getTbChannelProduct, api),
    takeLatest(TbTypes.TB_SEARCH_REQUEST, getTbSearch, api),
    takeLatest(TbTypes.TB_SET_DETAIL_REQUEST, setTbDetail, api),
    takeLatest(TbTypes.TB_DETAIL_REQUEST, getTbDetail, api),
    takeLatest(TbTypes.TB_TPWD_REQUEST, getTpwd, api),
    takeLatest(TbTypes.TB_BUY_REQUEST, getBuy, api),
    takeLatest(CircleTypes.CIRCLE_REQUEST, getCircle, api),
    takeLatest(ShareTypes.SHARE_REQUEST, postShare, api),
    takeLatest(ShareTypes.SHARE_LOGIN_REQUEST, thirdLogin, api),
    takeLatest(ShareTypes.SHARE_BIND_REQUEST, thirdBind, api),
    takeLatest(InviteTypes.INVITE_REQUEST, getInvite, api),
    takeLatest(OrderTypes.ORDER_REQUEST, getOrder, api)
  ])
}
