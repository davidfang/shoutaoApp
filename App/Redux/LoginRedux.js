import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import lodash from "lodash";
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['mobile', 'password'],
  loginSuccess: ['tokenInfo'],
  loginFailure: ['error'],
  logout: null,
  autoLogin: null,
  loginSetPassword:null,
  loginMobileVerifyCodeRequest:['mobile','verifyCode'],
  // loginMobileVerifyCodeSuccess:['tokenInfo']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tokenInfo: null,
  error: null,
  fetching: false,
  loading: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, data) => {
  const { tokenInfo } = data
  return state.merge({ fetching: false, error: null, tokenInfo })
}

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error })

// we've logged out
export const logout = (state) => INITIAL_STATE

// startup saga invoked autoLogin
export const autoLogin = (state) => state

export const setPasswordSuccess = state =>{
  //TODO 深度修改tokenInfo.password=true

  const tokenInfo = lodash.defaultsDeep({tokenInfo:{password:true}},state.tokenInfo)

  return state.merge({tokenInfo})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin,
  [Types.LOGIN_SET_PASSWORD]:setPasswordSuccess,//短信验证码注册登录一次进行后，设置密码
  [Types.LOGIN_MOBILE_VERIFY_CODE_REQUEST]:request

})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const LoginSelector = {
  isLoggedIn: (loginState) => {
    let { tokenInfo } = loginState
    if(tokenInfo == null){//没登录
      return false
    }else{//登录了 TODO
      return true
    }
  },
  tokenInfo:(state) => state.tokenInfo
}
