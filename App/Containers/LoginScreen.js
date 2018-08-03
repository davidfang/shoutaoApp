import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, Text, TextInput, Button, TouchableOpacity, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginScreenStyle'
import { Images, Colors } from '../Themes'
import LoginActions,{LoginSelector} from '../Redux/LoginRedux'
import Toast from "../Lib/Toast";

class LoginScreen extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  isAttempting = false

  constructor (props) {
    super(props)
    this.state = {
      mobile: '',
      password: ''
    }
    this.isAttempting = false
    if (props.logged) {
      this.props.navigation.navigate('MainStack')
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (newProps.error) {
      Toast.showError(newProps.error,{})
    }
    if(newProps.logged){
      this.props.navigation.navigate('MainStack')
    }

  }

  handlePressLogin = () => {
    const {mobile, password} = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(mobile, password)
  }

  handleChangeMobile = (text) => {
    this.setState({mobile: text})
  }

  handleChangePassword = (text) => {
    this.setState({password: text})
  }

  render () {
    const {mobile, password} = this.state
    const {fetching} = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <View contentContainerStyle={{justifyContent: 'center'}}
            style={styles.container} keyboardShouldPersistTaps='always'>
        <Image source={Images.logoLogin} style={styles.topLogo}/>
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>手机</Text>
            <TextInput
              ref='mobile'
              style={textInputStyle}
              value={mobile}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeMobile}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='手机'/>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>密码</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder='密码'/>
          </View>
        </View>
        <Text style={{textAlign:'right', padding:10, color: Colors.text}} onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>忘记密码</Text>
        <View style={styles.viewWrap}>
          <TouchableHighlight style={styles.button} onPress={this.handlePressLogin} underlayColor={Colors.ember}>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, {backgroundColor: Colors.text}]} onPress={() => this.props.navigation.navigate('RegisterScreen')} underlayColor={Colors.ember}>
            <Text style={styles.buttonText}>注册</Text>
          </TouchableHighlight>
        </View>


      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    logged: LoginSelector.isLoggedIn(state.login),
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (mobile, password) => dispatch(LoginActions.loginRequest(mobile, password)),
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
