import React, {Component} from 'react'
import {View, Text, TextInput, Switch,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserInfoActions, {UserInfoSelectors} from '../Redux/UserInfoRedux'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'
import Toast from "../Lib/Toast";

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
    if(!this.props.fetching) {
      let user = {
        mobile: this.state.mobile ,
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
  componentWillReceiveProps (newProps, oldProps) {

  }
  render() {
    return (
      <View style={styles.container}>
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
              <Text style={styles.formRowLabel}>密码</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'6-20位字母、数字、符号'}
                secureTextEntry={this.state.secret}
                onChangeText={text => this.setState({password: text.trim()})}
                value={this.state.password}
              />
              <Switch
                onValueChange={value =>  this.setState({secret: value})}
                value={this.state.secret}
              />
            </View>
          </View>
          {/*按钮部分*/}
          <View style={{marginTop: 40, marginHorizontal: 10}}>
            <TouchableOpacity
              style={styles.formButton}
              onPress={() => this.submit()}>
              <Text style={styles.formButtonText}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    changePassword:(user)=> dispatch(UserInfoActions.userInfoChangePasswordRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
