import React, { Component } from 'react'
import {
  ScrollView,
  Platform,
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


import Toast from '../Lib/Toast'
import FullButton from '../Components/FullButton'
import RoundedButton from '../Components/RoundedButton'
import Avatar from '../Components/Avatar'
import RowItem from '../Components/RowItem'
import CustomButton from '../Components/CustomButton'

// Styles
import { Colors } from '../Themes'
import styles from './Styles/UserInfoScreenStyle'
import AppConfig from "../Config/AppConfig";

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
    Toast.showSuccess('邀请码已复制到剪贴板，发给好友一起赚钱吧！')
  }
  userHead = () => {
    const {loggedIn, nickname,invitation_code, grade, avatar} = this.props
    if (loggedIn) {
      return (
        <View style={styles.top}>

          <View style={styles.head}>
            <View style={styles.intro}>
              <View style={styles.introLeft}>
                <Avatar width={60} name={nickname} avatar={avatar}/>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.nickName}>{nickname}</Text>
                    <View style={styles.memberButton}><Text>{grade}</Text></View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.invitationCode}>邀请码:{invitation_code}</Text>
                    <CustomButton onPress={this._copyInvitationCode}
                                         text='复制'
                                         color={Colors.text}
                                         styles={styles.copyButton}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.setting} onPress={this._setting}>
                <Icon name='settings' size={30} color={Colors.text}/>
              </TouchableOpacity>
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
  /**
   * 按钮操作
   * @private
   */
  _press = (nav,param) => {
    const {navigation} = this.props
    navigation.navigate &&
    navigation.navigate(nav,param)
  }
  /**
   * 网页链接
   * @param url
   * @param title
   * @private
   */
  _webPress = (url,title) => {
    const {navigation} = this.props
    url = AppConfig.webUrl + url
    console.log(url,title)
    navigation.navigate &&
    navigation.navigate('WebScreen',{url,title})
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
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article-category/1','新手攻略')}>
            <Image style={styles.gridIcon} source={require('../Images/guide.png')}/>
            <Text>新手攻略</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article/9','常见问题')}>
            <Image style={styles.gridIcon} source={require('../Images/questing.png')}/>
            <Text>常见问题</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article/10','联系客服')}>
            <Image style={styles.gridIcon} source={require('../Images/kefu.png')}/>
            <Text>联系客服</Text>
          </TouchableOpacity>
        </View>
        {this.props.loggedIn &&  (<View style={styles.rowItemGroup}>
            <RowItem title='修改密码' icon='vpn-key' iconColor='lightskyblue'
                     onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}/>

          </View>)
        }

        <View style={styles.rowItemGroup}>
          <RowItem title='官方公告' icon='volume-up' iconColor='lightskyblue' onPress={()=>this._webPress('article-category/4','官方公告')}/>
          <RowItem title='意见反馈' icon='create' iconColor='lightskyblue' onPress={() =>this._press('FeedbackScreen',{title:'意见反馈'})}/>
          <RowItem title='分享' icon='share' iconColor={Colors.fire} onPress={this._copyInvitationCode}/>

        </View>
        <View/>
        {this.props.loggedIn && (<RoundedButton text={'退出'} onPress={() => this.props.logout()}/>)}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {mobile,nickname,invitation_code,grade, avatar} = state.userInfo
  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),
    grade,
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
