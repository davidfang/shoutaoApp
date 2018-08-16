import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Switch} from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import RegisterActions,{RegisterSelectors} from '../Redux/RegisterRedux'
import VerifyCodeActions from '../Redux/VerifyCodeRedux'
import {LoginSelector} from '../Redux/LoginRedux'
// import YourActions from '../Redux/YourRedux'

import Toast from '../Lib/Toast'

import CountDownButton from '../Components/CountDownButton'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: '',
      verifyCode: '',
      password: '',
      invitation_code:'',
      agree: true,
      secret: true
    }
  }

  /**
   * 提交注册
   */
  submit() {
    if(!this.state.agree){
      Toast.showError('请同意服务条款',{})
      return
    }
    if(!this.props.fetching) {
      let account = {
        mobile: this.state.mobile,
        verifyCode: this.state.verifyCode,
        password: this.state.password,
        invitation_code: this.state.invitation_code
      }
      this.props.register(account)
    }
  }

  /**
   *
   * @param newProps
   * @param oldProps
   */
  componentWillReceiveProps (newProps, oldProps) {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>手机号</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'请输入手机号'}
              onChangeText={text => {
                text = text.replace(/ /g, '_')
                this.setState({mobile: text})
              }}
              value={this.state.mobile}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>验证码</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'验证码'}
              onChangeText={text => {
                text = text.replace(/ /g, '_')
                this.setState({verifyCode: text})
              }}
              value={this.state.verifyCode}
            />


            <CountDownButton
              timerTitle={'获取验证码'}
              timerCount={120}
              enable={this.state.mobile.length > 10}
              onClick={(shouldStartCounting)=>{
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
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>密 码</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'6-20位字母、数字、符号'}
              secureTextEntry={this.state.secret}
              onChangeText={text => {
                text = text.replace(/ /g, '_')
                this.setState({password: text})
              }}
              value={this.state.password}
            />
            <Switch
              onValueChange={value => {
                this.setState({secret: value})
              }}
              value={this.state.secret}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>邀请码</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'朋友发给你的邀请码，如无可不填'}
              onChangeText={text => {
                text = text.replace(/ /g, '_')
                this.setState({invitation_code: text})
              }}
              value={this.state.invitation_code}
            />
          </View>
        </View>
        {/*按钮部分*/}
        <View style={{marginTop: 40, marginHorizontal: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.setState({agree: !this.state.agree})}>
              <Icon name='checkbox' size={20} color={this.state.agree ? '#6DC305' : '#D5D5D5'}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#646464', marginLeft: 10}}>我已阅读并同意</Text>
              <TouchableOpacity>
                <Text style={{color: '#2972C6'}}>《服务条款》</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => this.submit()}>
            <Text style={styles.formButtonText}>注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.register.fetching,
    isLoggedIn: LoginSelector.isLoggedIn(state.login)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (account) => dispatch(RegisterActions.registerRequest(account)),
    getVerifyCode:(mobile) => dispatch(VerifyCodeActions.verifyCodeRequest(mobile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
