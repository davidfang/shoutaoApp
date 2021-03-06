import React, {Component} from 'react'
import {View, Text, TextInput, Switch, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserInfoActions, {UserInfoSelectors} from '../Redux/UserInfoRedux'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'
import {Colors} from '../Themes';

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: '',
      password: '',
      secret: true
    }
  }

  /**
   * 提交修改
   */
  submit() {
    if (!this.props.fetching) {
      let user = {
        mobile: this.state.mobile,
        password: this.state.password
      }
      this.props.changePassword(user)
    }
  }

  /**
   *
   * @param newProps
   * @param oldProps
   */
  componentWillReceiveProps(newProps, oldProps) {

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
              <Text style={styles.formRowLabel}>密码</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'6-20位字母、数字、符号'}
                placeholderTextColor={Colors.steel}
                secureTextEntry={this.state.secret}
                onChangeText={text => this.setState({password: text.trim()})}
                value={this.state.password}
                underlineColorAndroid='transparent'
              />
              <Switch
                onValueChange={value => this.setState({secret: value})}
                value={this.state.secret}
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
    fetching: state.userInfo.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (user) => dispatch(UserInfoActions.userInfoChangePasswordRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
