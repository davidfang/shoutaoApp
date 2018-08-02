import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, { LoginSelector } from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'
// import ImagePicker from 'react-native-image-picker'

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
  _setting = () => {
    const {navigation} = this.props
    navigation.navigate &&
    navigation.navigate('EditUserScreen')
  }
  userHead = () => {
    const {loggedIn, username, avatar} = this.props
    if (loggedIn) {
      return (
        <View style={styles.top}>
          <View style={styles.head}>
            <View style={styles.intro}>
              <View style={styles.introLeft}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <Avatar width={60} name={username} avatar={avatar}/>
                </TouchableOpacity>
                <View>
                  <Text style={styles.nickName}>木有昵称<CustomButton //onPress={onPressLearnMore}
                    text='超级会员'
                    color={Colors.button}
                    styles={styles.memberButton}/></Text>
                  <Text style={styles.invitationCode}>邀请码:xxxxxx<CustomButton //onPress={onPressLearnMore}
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
  const {username, avatar} = state.account
  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),
    username,
    avatar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout()),
    uploadAvatar: (fileUrl, fileName) => dispatch(AccountActions.uploadAvatarRequest(fileUrl, fileName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen)
