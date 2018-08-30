import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import VerifyCodeActions from '../Redux/VerifyCodeRedux'
import UserInfoActions from '../Redux/UserInfoRedux'
import AccountActins from '../Redux/AccountRedux'

// Styles
import styles from './Styles/BindingBankCardScreenStyle'


import CountDownButton from '../Components/CountDownButton'
import {Colors} from "../Themes";

class BindingBankCardScreen extends Component {
  constructor(props) {
    super(props)
    let mobile = props.mobile.substr(0, 3) + '****' + props.mobile.substr(-4)
    this.state = {
      name: '',
      bank_card_no: '',
      mobile: mobile,
      verifyCode: ''
    }
  }

  /**
   * 提交
   */
  submit() {
    if (!this.props.fetching) {
      let bankInfo = {
        name: this.state.name,
        bank_card_no: this.state.bank_card_no,
        verifyCode: this.state.verifyCode
      }
      this.props.setBankInfo(bankInfo)
    }

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>姓名</Text>
              <TextInput style={styles.formTextInput}
                         placeholder='请输入支付宝认证的真实姓名'
                         placeholderTextColor={Colors.steel}
                         value={this.state.name}
                         onChangeText={text => {
                           text = text.replace(/ /g, '')
                           this.setState({name: text})
                         }}
                         underlineColorAndroid='transparent'
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>支付宝帐号</Text>
              <TextInput style={styles.formTextInput}
                         placeholder='请输入支付宝帐号'
                         placeholderTextColor={Colors.steel}
                         value={this.state.bank_card_no}
                         onChangeText={text => {
                           text = text.replace(/ /g, '')
                           this.setState({bank_card_no: text})
                         }}
                         underlineColorAndroid='transparent'
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>手机号码</Text>
              <TextInput style={styles.formTextInput}
                         placeholder='请输入手机号码'
                         placeholderTextColor={Colors.steel}
                         editable={false}
                         keyboardType='numeric'
                         returnKeyType='next'
                         value={this.state.mobile}
                         underlineColorAndroid='transparent'
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>验证码</Text>
              <TextInput style={styles.formTextInput}
                         placeholder='请输入验证码'
                         placeholderTextColor={Colors.steel}
                         value={this.state.verifyCode}
                         onChangeText={text => {
                           text = text.replace(/ /g, '')
                           this.setState({verifyCode: text})
                         }}
                         underlineColorAndroid='transparent'
              />
              <CountDownButton
                timerTitle={'获取验证码'}
                timerCount={120}
                enable={true}
                onClick={(shouldStartCounting) => {
                  this.props.getVerifyCode(this.props.mobile)
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
                <Text style={styles.formButtonText}>提交</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.account.fetching,
    mobile: state.userInfo.mobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVerifyCode: (mobile) => dispatch(VerifyCodeActions.verifyCodeRequest(mobile)),
    setBankInfo: (bankInfo) => dispatch(AccountActins.bankInfoSetRequest(bankInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindingBankCardScreen)
