import React, {Component} from 'react'
import {View, Text, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ShareActions from '../Redux/ShareRedux'
import CountDownButton from '../Components/CountDownButton'
// Styles
import styles from './Styles/BindMobileScreenStyle'
import {Colors, ScreenUtil} from "../Themes";
import VerifyCodeActions from "../Redux/VerifyCodeRedux";

class BindMobileScreen extends Component {
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
      let {thirdLoginId, uid, platform} = this.props
      let {mobile, verifyCode} = this.state
      this.props.thirdBind(thirdLoginId, uid, platform, mobile, verifyCode)
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/*表单部分*/}
          <View style={styles.form}>
            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>手机</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'请填写注册的手机号'}
                placeholderTextColor={Colors.steel}
                onChangeText={text => this.setState({mobile: text.trim()})}
                value={this.state.mobile}
                underlineColorAndroid='transparent'
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>短信</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'短信验证码'}
                placeholderTextColor={Colors.steel}
                onChangeText={text => this.setState({verifyCode: text.trim()})}
                value={this.state.verifyCode}
                underlineColorAndroid='transparent'
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

            {/*按钮部分*/}
            <View style={styles.formButtonGroup}>
              <TouchableOpacity
                style={styles.formButton}
                onPress={() => this.submit()}>
                <Text style={styles.formButtonText}>绑定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    fetching: state.share.fetching,
    ...props.navigation.state.params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    thirdBind: (thirdLoginId, uid, platform, mobile, verifyCode) => dispatch(ShareActions.shareBindRequest({
      thirdLoginId,
      uid,
      platform,
      mobile,
      verifyCode
    })),
    getVerifyCode: (mobile) => dispatch(VerifyCodeActions.verifyCodeRequest(mobile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindMobileScreen)
