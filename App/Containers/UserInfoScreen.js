import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  Clipboard,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, { LoginSelector } from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'
import UserInfoActions from '../Redux/UserInfoRedux'
// import ImagePicker from 'react-native-image-picker'

import Toast from '../Lib/Toast'
import FullButton from '../Components/FullButton'
import RoundedButton from '../Components/RoundedButton'
import Avatar from '../Components/Avatar'
import RowItem from '../Components/RowItem'
import CustomButton from '../Components/CustomButton'

// Styles
import { Colors } from '../Themes'
import styles from './Styles/UserInfoScreenStyle'

class UserInfoScreen extends Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount () {
    if(this.props.mobile == null){
      this.props.getUserInfo()
    }
  }
  _setting = () => {
    const {navigation} = this.props
    navigation.navigate &&
    navigation.navigate('EditUserScreen')
  }
  _copyInvitationCode = () =>{
    Clipboard.setString('我在使用一个超级好用的优惠券APP，淘宝天猫购物之前先在此搜一下，领内部优惠券，还可以获得购物返利，邀请别人使用，还可以获得别人购物的返利。注册时记得填我的邀请码： ' + this.props.invitation_code)
    Toast.showSuccess('邀请码已经复制到剪贴板，请发给好朋友一起赚钱吧！')
  }
  userHead = () => {
    const {loggedIn, nickname,invitation_code,  avatar} = this.props
    if (loggedIn) {
      return (
        <View style={styles.top}>
          <View style={styles.head}>
            <View style={styles.intro}>
              <View style={styles.introLeft}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <Avatar width={60} name={nickname} avatar={avatar}/>
                </TouchableOpacity>
                <View>
                  <Text style={styles.nickName}>{nickname}
                    <View style={styles.memberButton}><Text >超级会员</Text></View>
                  </Text>
                  <Text style={styles.invitationCode}>邀请码:{invitation_code}<CustomButton onPress={this._copyInvitationCode}
                    text='复制'
                    color={Colors.text}
                    styles={styles.copyButton}
                  /></Text>
                </View>
              </View>
              <TouchableOpacity style={styles.setting} onPress={this._setting}>
                <Icon name='settings' size={30} color={Colors.text}/>
              </TouchableOpacity>
              {/*
            <TouchableOpacity style={styles.introRight} onPress={() => this.props.navigation.navigate('SettingsScreen')}>
              <Text style={Fonts.style.h3}>{username}</Text>
              {Platform.OS === 'ios' ? <Icon name='ios-arrow-forward' color={Colors.charcoal} size={18}/>
                : null
              }
              {Platform.OS === 'android' ? <Icon name='md-arrow-forward' color={Colors.charcoal} size={18}/>
                : null
              }
            </TouchableOpacity>
            */}
            </View>
            <View style={styles.incomeTop}>
              <Text>可提现金额：￥ 0 </Text>
              <CustomButton //onPress={onPressLearnMore}
                text='提现'
                color={Colors.text}
                styles={styles.withdrawButton}
              />
            </View>
          </View>
          <View style={styles.incomeBottom}>
            <View style={styles.incomeBottomItem}>
              <View><Text>￥0</Text></View>
              <View><Text>本月预估</Text></View>
            </View>
            <View style={styles.incomeBottomItem}>
              <View><Text>￥0</Text></View>
              <View><Text>本月预估</Text></View>
            </View>
            <View style={styles.incomeBottomItem}>
              <View><Text>￥0</Text></View>
              <View><Text>本月预估</Text></View>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.head}>
          <View style={[styles.intro, styles.headNoLogin]}>
            <Avatar width={60}/>
            <FullButton text={'登录'} onPress={() => this.props.navigation.navigate('LoginScreen')}/>
            <FullButton text={'注册'} onPress={() => this.props.navigation.navigate('RegisterScreen')}/>
          </View>
        </View>
      )
    }
  }

  selectPhotoTapped () {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '图片库',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 600,
      maxHeight: 600,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response)
    //
    //   if (response.didCancel) {
    //     console.log('User cancelled photo picker')
    //   }
    //   else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error)
    //   }
    //   else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton)
    //   }
    //   else {
    //     let source = {uri: response.uri}
    //
    //     // You can also display the image using data:
    //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    //
    //     this.props.uploadAvatar(response.uri, response.fileName)
    //     /*this.setState({
    //       avatarSource: source
    //     })*/
    //   }
    // })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.userHead()}
        <View style={styles.gridItemGroup}>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/shouyi.png')}/>
            <Text>收益</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/dd.png')}/>
            <Text>订单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/users.png')}/>
            <Text>粉丝</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/invite.png')}/>
            <Text>邀请</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridItemGroup}>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/guide.png')}/>
            <Text>新手攻略</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/collection.png')}/>
            <Text>我的收藏</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/questing.png')}/>
            <Text>常见问题</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
            <Image style={styles.gridIcon} source={require('../Images/kefu.png')}/>
            <Text>联系客服</Text>
          </TouchableOpacity>
        </View>
        {this.props.loggedIn && (
          <View style={styles.rowItemGroup}>
            <RowItem title='修改密码' icon='vpn-key' iconColor='lightskyblue'
                     onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}/>

          </View>)
        }
        <View style={styles.rowItemGroup}>
          <RowItem title='首页内容展示顺序' icon='reorder' iconColor='lightskyblue'/>
          <RowItem title='主题颜色' icon='color-lens' iconColor={Colors.fire}/>

        </View>
        <View style={styles.rowItemGroup}>
          <RowItem title='官方公告' icon='volume-up' iconColor='lightskyblue'/>
          <RowItem title='反馈' icon='create' iconColor='lightskyblue'/>
          <RowItem title='分享' icon='share' iconColor={Colors.fire}/>

        </View>
        <View/>
        {this.props.loggedIn && (<RoundedButton text={'退出'} onPress={() => this.props.logout()}/>)}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {mobile,nickname,invitation_code, avatar} = state.userInfo
  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),

    mobile,
    nickname,
    invitation_code,
    avatar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(UserInfoActions.userInfoRequest()),
    logout: () => {
      dispatch(LoginActions.logout())
      dispatch(UserInfoActions.userInfoLogout())
    },
    uploadAvatar: (fileUrl, fileName) => dispatch(UserInfoActions.uploadAvatarRequest(fileUrl, fileName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen)
