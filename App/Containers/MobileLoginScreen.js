import React, {Component} from 'react'
import {View, Text, TouchableOpacity,Image, TextInput} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/MobileLoginScreenStyle'
import styles from './Styles/LoginScreenStyle'
import LoginActions from "../Redux/LoginRedux";
import Toast from "../Lib/Toast";
import CountDownButton from '../Components/CountDownButton'
import VerifyCodeActions from "../Redux/VerifyCodeRedux";
import {Colors, Images} from "../Themes";

class MobileLoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: '',
      verifyCode: ''
    }
  }

  /**
   * 提交修改
   */
  submit() {
    if (!this.props.fetching) {
      let {mobile, verifyCode} = this.state
      this.props.mobileLogin(mobile, verifyCode)
    }
  }

  /**
   *
   * @param newProps
   * @param oldProps
   */
  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.error) {
      Toast.showError(newProps.error, {})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.logoLogin} style={styles.topLogo}/>
        {/*表单部分*/}
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>手机</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'请填写注册的手机号'}
              onChangeText={text => this.setState({mobile: text.trim()})}
              value={this.state.mobile}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>短信</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'短信验证码'}
                onChangeText={text => this.setState({verifyCode: text.trim()})}
                value={this.state.verifyCode}
              />
              <CountDownButton
                timerTitle={'获取验证码'}
                timerCount={120}
                enable={this.state.mobile.length > 10}
                onClick={(shouldStartCounting) => {
                  this.props.getVerifyCode(this.state.mobile)
                  shouldStartCounting && shouldStartCounting(true)
                }}
                // timerEnd={()=>{
                //   // this.setState({
                //   //   state: '倒计时结束'
                //   // })
                // }}
              />
            </View>
          </View>
          {/*按钮部分*/}
          <View style={styles.viewWrap}>
            <TouchableOpacity style={styles.button} onPress={() => this.submit()} underlayColor={Colors.ember}>
              <Text style={styles.buttonText}>登录</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewWrap}>
            <TouchableOpacity style={[styles.button, {backgroundColor: Colors.banner}]} onPress={() => this.props.navigation.navigate('RegisterScreen')} underlayColor={Colors.ember}>
              <Text style={styles.buttonText}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: Colors.banner}]} onPress={() => this.props.navigation.navigate('LoginScreen')} underlayColor={Colors.ember}>
              <Text style={styles.buttonText}>密码登录</Text>
            </TouchableOpacity>
          </View>
        </View>


        </View>


    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    tokenInfo: state.login.tokenInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mobileLogin: (mobile, verifyCode) => dispatch(LoginActions.loginMobileVerifyCodeRequest(mobile, verifyCode)),

    getVerifyCode: (mobile) => dispatch(VerifyCodeActions.verifyCodeRequest(mobile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileLoginScreen)
