import React, {Component} from 'react'
import {Keyboard, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import UserInfoActions from '../Redux/UserInfoRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InputInvitaionCodeStyle'
import {Colors, ScreenUtil} from "../Themes";
import Toast from "../Lib/Toast";

class InputInvitaionCode extends Component {
  constructor(props) {
    super(props)
    this.state = {invitation_code: ''}
  }
  /**
   * 提交注册
   */
  submit() {
    if (!this.props.fetching) {
      let account
      if (this.state.invitation_code != '') {
        this.props.invitationCodeSet(this.state.invitation_code)
      } else {
        Toast.showWarning('邀请码不能为空')
      }
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.formRow}>
              <Text style={styles.formRowLabel}>邀请码</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'朋友发给你的邀请码，只可提交一次，不可修改'}
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

          </View>

          <View style={styles.formButtonGroup}>
            <TouchableOpacity
              style={styles.formButton}
              onPress={() => this.submit()}>
              <Text style={styles.formButtonText}>绑定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    invitationCodeSet:(invitationCode)=>dispatch(UserInfoActions.invitationCodeSetRequest(invitationCode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputInvitaionCode)
