import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, Text, TextInput, Button, TouchableOpacity } from 'react-native'
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

  constructor (props) {
    super(props)
    this.state = {
      mobile: '',
      password: ''
    }
    if (props.logged) {
      this.props.navigation.navigate('MainStack')
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (newProps.error) {
      Toast.showError(newProps.error,{})
    }
  }

  handlePressLogin = () => {
    const {mobile, password} = this.state
    if(!this.props.fetching) {
      this.props.login(mobile, password)
    }
  }

  render () {
    return (
      <View contentContainerStyle={{justifyContent: 'center'}}
            style={styles.container} keyboardShouldPersistTaps='always'>
        <Image source={Images.logoLogin} style={styles.topLogo}/>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>手机</Text>
            <TextInput
              ref='mobile'
              style={styles.formTextInput}
              value={this.state.mobile}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text)=>this.setState({mobile:text})}
              underlineColorAndroid='transparent'
              placeholder='手机'/>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>密码</Text>
            <TextInput
              ref='password'
              style={styles.formTextInput}
              value={this.state.password}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={text => this.setState({password:text})}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder='密码'/>
          </View>
        </View>
        <View style={styles.viewWrap}>
          <TouchableOpacity style={styles.button} onPress={this.handlePressLogin} underlayColor={Colors.ember}>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewWrap}>
          <TouchableOpacity style={[styles.button, {backgroundColor: Colors.banner}]} onPress={() => this.props.navigation.navigate('RegisterScreen')} underlayColor={Colors.ember}>
            <Text style={styles.buttonText}>注册</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: Colors.banner}]} onPress={() => this.props.navigation.navigate('MobileLoginScreen')} underlayColor={Colors.ember}>
            <Text style={styles.buttonText}>短信登录</Text>
          </TouchableOpacity>
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
    login: (mobile, password) => dispatch(LoginActions.loginRequest(mobile, password)),
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
