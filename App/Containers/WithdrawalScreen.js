import React, { Component } from 'react'
import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AccountActions from '../Redux/AccountRedux'

// Styles
import styles from './Styles/WithdrawalScreenStyle'

class WithdrawalScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: '0',
      remark_submit: ''
    }
  }
  /**
   * 提交
   */
  submit() {
    if (!this.props.fetching) {
      let withdrawal = {
        amount: this.state.amount,
        remark_submit: this.state.remark_submit
      }
      this.props.postWithdrawal(withdrawal)
    }

  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>提现金额</Text>
            <TextInput style={styles.formTextInput}
                       placeholder='请输入提现金额'
                       value={this.state.amount}
                       multiline={false}
                       keyboardType='numeric'

                       onChangeText={text => {
                         this.setState({amount: text})
                       }}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>备注</Text>
            <TextInput style={styles.formTextInput}
                       placeholder='请输入备注'
                       value={this.state.remark_submit}
                       returnKeyType='done'
                       onChangeText={text => {
                         text = text.replace(/ /g, '')
                         this.setState({remark_submit: text})
                       }}
            />
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
    fetching: state.account.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postWithdrawal:(withdrawal) => dispatch(AccountActions.withdrawalRequest(withdrawal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalScreen)
