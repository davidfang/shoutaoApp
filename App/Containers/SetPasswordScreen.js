import React, {Component} from 'react'
import {View, Text, TextInput, Switch, TouchableOpacity, Keyboard,TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SetPasswordScreenStyle'
import UserInfoActions from "../Redux/UserInfoRedux";
import {Colors, ScreenUtil} from "../Themes";

class SetPasswordScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      secret: true,
      invitation_code: ''
    }
  }

  /**
   * 提交修改
   */
  submit() {
    if (!this.props.fetching) {
      let user
      if (this.state.invitation_code != '') {
        user = {
          mobile: this.props.mobile,
          password: this.state.password,
          invitation_code: this.state.invitation_code
        }
      }else {
        user = {
          mobile: this.props.mobile,
          password: this.state.password
        }
      }
      this.props.setPassword(user)
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
          <View style={styles.formHead}>
            <Text style={styles.formHeadText}>设置密码</Text>
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

          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>邀请码</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'朋友发给你的邀请码，如无可不填'}
              placeholderTextColor={Colors.steel}
              returnKeyType='done'
              onChangeText={text => {
                text = text.replace(/ /g, '')
                this.setState({invitation_code: text})
              }}
              value={this.state.invitation_code}
              underlineColorAndroid='transparent'
            />
          </View>

          {/*按钮部分*/}
          <View style={{marginTop: ScreenUtil.scaleHeight(40), marginHorizontal: ScreenUtil.scaleSize(10)}}>
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
    fetching: state.userInfo.fetching,
    mobile: state.userInfo.mobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPassword: (user) => dispatch(UserInfoActions.userInfoSetPasswordRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordScreen)
