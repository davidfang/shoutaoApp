import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-crop-picker'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserInfoActions,{UserInfoSelectors} from '../Redux/UserInfoRedux'
import Avatar from '../Components/Avatar'
// Styles
import styles from './Styles/EditUserScreenStyle'
import Toast from "../Lib/Toast";

class EditUserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: props.nickname || '',
      avatar: props.avatar || '',
      email: props.email || '',
      age: props.age || '',
      gender: props.gender || ''
    }
  }
  /**
   * 提交修改
   */
  submit() {
    if(!this.props.fetching) {
      let user = {
        nickname: this.state.nickname ,
        email: this.state.email ,
        age: this.state.age ,
        gender: this.state.gender
      }
      this.props.updateUserInfo(user)
    }
  }
  /**
   *
   * @param newProps
   * @param oldProps
   */
  componentWillReceiveProps (newProps, oldProps) {
    if(newProps.error){
      Toast.showError(newProps.error,{})
    }
    // if(newProps.error == null){
    //   Toast.showSuccess('修改成功',() => this.props.navigation.goBack())
    // }
  }
  selectPhotoTapped = ()=> {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay:true
    }).then(image => {
      //console.log(image);
      let fileUrl = image.path
      let fileName = Platform.OS == 'ios' ? image.filename : fileUrl.substr(fileUrl.lastIndexOf('/')+1);
      this.props.uploadAvatar(fileUrl, fileName)
    }).catch(e => alert(e));
  }
  render () {
    const {nickname, avatar} = this.props
    return (
      <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Avatar width={130} name={nickname} avatar={avatar}/>
          </TouchableOpacity>
          <Text style={styles.formRowLabel}>点击修改头像</Text>
        </View>
        <View style={styles.form}>
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
            <Text style={styles.formRowLabel}>性 别</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 20}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.setState({gender: '1'})}
              >
                <Text style={{color: '#2955B6', marginRight: 5}}>男</Text>
                <Icon name='human-male' size={30} color={this.state.gender == '1' ? '#2955B6' : '#D5D5D5'}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.setState({gender: '2'})}
              >
                <Text style={{color: '#E25287', marginRight: 5}}>女</Text>
                <Icon name='human-female' size={30}color={this.state.gender == '2' ? '#E25287' : '#D5D5D5'}/>
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
            <Text style={styles.formButtonText}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.userInfo.fetching,
    error: UserInfoSelectors.getError(state.userInfo),
    nickname: state.userInfo.nickname,
    avatar: state.userInfo.avatar,
    email: state.userInfo.email,
    age: state.userInfo.age.toString(),
    gender:state.userInfo.gender.toString()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (user)=> dispatch(UserInfoActions.userInfoUpdateRequest(user)),
    uploadAvatar: (fileUrl, fileName) => dispatch(UserInfoActions.uploadAvatarRequest(fileUrl, fileName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserScreen)
