import React, { Component } from 'react'
import {
  ScrollView,
  RefreshControl,
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
import {AppSetSelectors} from '../Redux/AppSetRedux'


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
    if(this.props.loggedIn){
      this.props.getAccountInfo()
    }
  }
  _setting = () => {
    const {navigation} = this.props
    navigation.navigate &&
    navigation.navigate('EditUserScreen')
  }
  _copyInvitationCode = () =>{

    Clipboard.setString('我在使用一个超级好用的优惠券APP，淘宝天猫购物之前先在此搜一下，领内部优惠券，还可以获得购物返利，邀请别人使用，还可以获得别人购物的返利。注册时记得填我的邀请码： ' + this.props.invitation_code +  this.props.downloadUrl)
    Toast.showSuccess('邀请码已复制到剪贴板，发给好友一起赚钱吧！')
  }
  userHead = () => {
    const {loggedIn, nickname,invitation_code, grade, avatar} = this.props
    if (loggedIn) {
      let {accountInfo,bankInfo} = this.props
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
              <Text>可提现金额：￥ {accountInfo.hasOwnProperty('cash_balance') ? accountInfo.cash_balance : 0} </Text>
              <CustomButton onPress={this._withdrawal}
                text='提现'
                color={Colors.text}
                styles={styles.withdrawButton}
              />
            </View>
          </View>



          <View style={styles.incomeBottom}>
            <View style={styles.incomeBottomItem}>
              <View><Text>￥{accountInfo.hasOwnProperty('uncash_balance') ? accountInfo.uncash_balance : 0}</Text></View>
              <View><Text>本月确认</Text></View>
            </View>
            <View style={styles.incomeBottomItem}>
              <View><Text>￥{accountInfo.hasOwnProperty('freeze_uncash_balance') ? accountInfo.freeze_uncash_balance : 0}</Text></View>
              <View><Text>未确认</Text></View>
            </View>
            <View style={styles.incomeBottomItem}>
              <View><Text>{accountInfo.hasOwnProperty('fans') ? accountInfo.fans : 0}人</Text></View>
              <View><Text>粉丝数</Text></View>
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
   * 提现操作
   * @private
   */
  _withdrawal = () => {
    const {navigation} = this.props
    if(this.props.bankInfo == null){
      Toast.show('请先绑定支付宝')
      navigation.navigate &&
      navigation.navigate('BindingBankCardScreen')
    }else{
      navigation.navigate &&
      navigation.navigate('WithdrawalScreen')
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
    //console.log(url,title)
    navigation.navigate &&
    navigation.navigate('WebScreen',{url,title})
  }
  /**
   * 刷新
   * @private
   */
  _onRefresh = () => {
    if(this.props.loggedIn){
      this.props.getAccountInfo()
    }
  }
  render () {
    return (
      <ScrollView style={styles.container}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.props.fetching}
                      onRefresh={this._onRefresh}
                    />
                  }
      >
        {this.userHead()}
        <View style={styles.gridItemGroup}>
          {this.props.loggedIn &&  (<TouchableOpacity style={styles.gridItem} onPress={() => this._press('FansScreen',{})}>
            <Image style={styles.gridIcon} source={require('../Images/users.png')}/>
            <Text>粉丝</Text>
          </TouchableOpacity>)}
          {this.props.loggedIn &&  (<TouchableOpacity style={styles.gridItem} onPress={this._copyInvitationCode}>
            <Image style={styles.gridIcon} source={require('../Images/invite.png')}/>
            <Text>邀请</Text>
          </TouchableOpacity>)}
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article-category/1','新手攻略')}>
            <Image style={styles.gridIcon} source={require('../Images/guide.png')}/>
            <Text>新手攻略</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article-category/2','常见问题')}>
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
  const {accountInfo,bankInfo,fetching} = state.account
  let downloadUrl = AppSetSelectors.get(state.appSet,'downloadUrl');
  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),
    grade,
    mobile,
    nickname,
    invitation_code,
    downloadUrl,
    avatar,
    accountInfo,
    bankInfo,
    fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(UserInfoActions.userInfoRequest()),
    logout: () => {
      dispatch(LoginActions.logout())
      dispatch(UserInfoActions.userInfoLogout())
    },
    uploadAvatar: (fileUrl, fileName) => dispatch(UserInfoActions.uploadAvatarRequest(fileUrl, fileName)),
    getAccountInfo: () => dispatch(AccountActions.accountRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen)
