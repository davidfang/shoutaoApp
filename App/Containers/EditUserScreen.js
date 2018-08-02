import React, { Component } from 'react'
import { View, Text,TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AccountActions from '../Redux/AccountRedux'

// Styles
import styles from './Styles/EditUserScreenStyle'

class EditUserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: '',
      email: '',
      age: '',
      gender:''
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.from}>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>昵 称</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'请填写昵称'}
              onChangeText={text => {
                text = text.replace(/ /g, '_')
                this.setState({nickname: text})
              }}
              value={this.state.nickname}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>邮 箱</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'请填写邮箱'}
              keyboardType='email-address'
              onChangeText={text => {
                text = text.replace(/ /g, '_')
                this.setState({email: text})
              }}
              value={this.state.email}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>年龄</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'请填年龄以便推荐更好的产品'}
              keyboardType='numeric'
              onChangeText={text => {
                text = text.replace(/ /g, '_')
                this.setState({age: text})
              }}
              value={this.state.age}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>性别</Text>
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



          <View style={styles.formRow}>
            <Text style={styles.formRowLabel}>性 别</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 20}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.setState({gender: '1'})}
              >
                <Text style={{color: '#2955B6', marginRight: 5}}>男</Text>
                <Icon name='human-male' size={30} color={this.state.gender === '1' ? '#2955B6' : '#D5D5D5'}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.setState({gender: '2'})}
              >
                <Text style={{color: '#E25287', marginRight: 5}}>女</Text>
                <Icon name='human-female' size={30}color={this.state.gender === '2' ? '#E25287' : '#D5D5D5'}/>
              </TouchableOpacity>
            </View>
            <Text style={{color: '#646464'}}>选填</Text>
          </View>

        </View>
        {/*按钮部分*/}
        <View style={{marginTop: 40, marginHorizontal: 10}}>
          <TouchableOpacity
            style={[styles.formButton]}
            onPress={() => this.submit()}>
            <Text style={{color: '#fff', fontSize: 17}}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.account.nickname,
    email: state.account.email,
    age: state.account.age,
    gender:state.account.gender
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserScreen)
