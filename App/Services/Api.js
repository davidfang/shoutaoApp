// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (tokenInfo) => api.setHeader('Authorization', tokenInfo.token_type + ' ' + tokenInfo.access_token) // 设置token
  const removeAuthToken = () => api.setHeader('Authorization', '') // 删除token
  const setFormData = () => api.setHeader('Content-Type', 'multipart/form-data;charset=utf-8') // 设置form data文件上传
  const setJsonData = () => api.setHeader('Content-Type', 'application/json;charset=utf-8') // 设置form data文件上传
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const singUp = (mobile, code, password) => api.post('v1/sign-in/signup', {mobile, code, password})
  // const login = (mobile, password) => api.post('v1/sign-in/login', {identity: mobile, password})
  // const login = (mobile, password) => api.post('api/v1/sign-in/login', {identity:mobile, password,type:'miliao'})
  //const login = (mobile, password) => api.post('api/v1/sign-in/login', userAuth)
  const login = (userAuth) => api.post('passport/login', userAuth)// 登录
  const loginByVerifyCode = (userAuth) => api.post('passport/fast-login', userAuth)// 短信验证码登录
  const getVerifyCode = (mobile) => api.post('send-code', {mobile})// 获取手机验证码

  const getRegister = (user) => api.post('passport/register', user) // 注册
  const forgotPassword = (data) => api.post('v1/sign-in/reset-password', data) // 忘记密码

  const getAccount = () => api.get('account/index') // 用户中心 获得用户帐户信息
  const updateAccount = (user) => api.put('user/update', user) // 更新用户信息
  const getBankInfo = () => api.get('bankcard/show')//获取用户银行卡支付宝绑定信息
  const setBankInfo = (bankInfo) => api.post('bankcard/create',bankInfo)//设置银行卡支付宝绑定信息
  const withdrawal = (withdrawal)=> api.post('account/withdrawal',withdrawal)//提现申请
  const getUserInfo = () => api.get('user/info') // 用户中心 获得用户信息
  const updateUserInfo = (user) => api.post('user/update', user) // 更新用户信息
  const setPassword = (data) => api.post('passport/password-set', data) // 设置密码
  const changePassword = (data) => api.post('passport/password-change', data) // 修改密码

  const getCaptcha = () => api.get('site/captcha', {refresh: 'refresh'}) // 获取图片验证码
  const checkCaptcha = (code) => api.get('site/check-captcha', {code}) // 校验图片验证码
  const getCode = (mobile, captcha) => api.get('sms-api/get-code', {mobile, id: 1, captcha}) // 获取手机验证码
  const getBanner = (type) => api.get('banner/index', {type}) // 获得轮播图

  const getProvince = (parentId) => api.get('v1/prov-city-area-street/index', {parentId}) // 获得省市区信息

  // ignite-jhipster-api-method-needle
  const uploadAvatar = (formData) => api.post('user/avatar', formData) //上传图像
  const getQiniuAvatarToken = () => api.get('qiniu/avatarToken')//上传头像获得七牛图片上传token
  const getQiniuFeedbackToken = (userId) => api.post('qiniu/feedbackToken',{userId})//用户反馈获得七牛图片上传token

  const uploadQiniu = (formData) => api.post('', formData)//七牛 上传图像到七牛

  const getFans = (page)=> api.get('user/fans',{page}) //获得粉丝
  const getGrandFans = (page)=> api.get('user/grand-fans',{page}) //获得孙子粉丝
  // const feedBack = (formData) => api.post('feed-back', formData) //用户反馈意见
  const feedBack = (formData) => api.post('', formData) //七牛 用户反馈意见

  const getCircle = (category_id,page) => api.get('circle',{category_id,page}) // 获得分类圈子的分享文章
  const getGoodsCategory = () => api.get('category') // 获得产品分类
  const getTbIndexRecommend = (page) => api.get('goods/recommend', {page}) // 获得首页淘宝推荐产品
  const getTbChannelProduct = (channelId, sortId, page) => api.get('goods/category', {categoryId:channelId, sortId, page}) // 获得频道推荐产品
  const getOrder = (status,  page) => api.get('order', {status, page}) // 获得订单列表信息
  const getTbSearchKeyWord = (keyWord, page, sortId) => api.get('search', {keyWord, page, sortId}) // 获得搜索产品
  const getTbDetail = (goodsId) => api.get('goods/show/'+ goodsId) // 获得产品详情
  const setTbDetail = (num_iid,detail) => api.post('goods/set-detail2',{num_iid,detail}) // 设置产品详情
  const getAppSet = (data) => api.post('app-set',data)//获得系统设置
  const postShare = (data) => api.post('share',data)//提交分享信息
  const thirdLogin = (data) => api.post('thirdLogin/login',data)//三方登录
  const thirdBind = (data) => api.post('thirdLogin/bind',data)//三方登录绑定用户
  const getInvite = () => api.get('invite')//获得邀请模板信息
  const getTpwd = (goodsId)=> api.get('goods/tpwd/'+ goodsId)//获得淘口令
  const getDTpwd = (goodsId)=> api.get('goods/dtpwd/'+ goodsId)//获得淘口令
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAuthToken,
    removeAuthToken,
    setFormData,
    setJsonData,
    getRoot,
    getRate,
    getUser,
    singUp,
    getAppSet,
    login,
    loginByVerifyCode,
    getVerifyCode,
    getBanner,

    getRegister,
    forgotPassword,

    getUserInfo,
    getFans,
    getGrandFans,
    updateUserInfo,

    getAccount,
    updateAccount,
    getBankInfo,
    setBankInfo,
    withdrawal,
    setPassword,
    changePassword,

    getCaptcha,
    checkCaptcha,
    getCode,

    getProvince,
    uploadAvatar,
    uploadQiniu,
    getQiniuAvatarToken,
    getQiniuFeedbackToken,
    feedBack,
    getCircle,
    getGoodsCategory,
    getTbIndexRecommend,
    getTbChannelProduct,
    getOrder,
    getTbSearchKeyWord,
    getTbDetail,
    setTbDetail,
    postShare,
    thirdLogin,
    thirdBind,
    getInvite,
    getTpwd,
    getDTpwd
  }
}

// let's return back our create method as the default.
export default {
  create
}
