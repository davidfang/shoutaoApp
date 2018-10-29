import React, {Component} from 'react'
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
import UMShare from '../Lib/UMShareUtil'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, {LoginSelector} from '../Redux/LoginRedux'
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
import {Colors, ScreenUtil} from '../Themes'
import styles from './Styles/UserInfoScreenStyle'
import AppConfig from "../Config/AppConfig";
import ShareActions from "../Redux/ShareRedux";

class UserInfoScreen extends Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.getAccountInfo()
      this.props.getBankInfo()
    }
  }

  _setting = () => {
    const {navigation} = this.props
    navigation.navigate &&
    navigation.navigate('EditUserScreen')
  }
  _share = () => {
    //console.log('分享开始')
    //console.log(UMShare)
    let {shareTitle,shareText,shareImage,shareUrl,uid,invitation_code} = this.props
    //调用模板分享
    UMShare.shareboard(shareText+ ' 邀请码:' + invitation_code,shareImage,shareUrl,shareTitle,
            (code, message) => {
            //console.warn(code,message);
            //console.warn(uid, shareText, shareImage, shareUrl, shareTitle)
            this.props.postShare(uid, shareText , shareImage, shareUrl, shareTitle, 2, 2, code, message,'{}')
      });
    // UMShare.shareboard(
    //   '好多优惠券，还能赚钱，真的好实惠呀',
    //   'http://dev.umeng.com/images/tab2_1.png',
    //   'http://quanzhenduo.zhicaikeji.com',
    //   '一个可以领优惠券的APP', (code, message) => {
    //     //console.log(code,message);
    //
    //     let uid = this.props.uid;
    //     this.props.postShare(uid, text, img, url, title, 2, 1, code, message)
    //   });

    console.log('分享结束')
  }
  _copyInvitationCode = () => {
    let msg = '我在使用一个超级好用的优惠券APP，淘宝天猫购物之前先在此搜一下，领内部优惠券，还可以获得购物返利，邀请别人使用，还可以获得别人购物的返利。注册时记得填我的邀请码： ' + this.props.invitation_code + this.props.downloadUrl
    Clipboard.setString(this.props.invitation_code)
    Toast.showSuccess('邀请码已复制，发给好友一起赚钱吧！')
    // UMShare.share(msg,'','','',2,(code,message)=> {
    //   console.log(code,message)
    // })
  }
  userHead = () => {
    const {loggedIn, nickname, invitation_code, grade, avatar} = this.props
    if (loggedIn) {
      let {accountInfo, bankInfo} = this.props
      if (accountInfo) {
        return (
          <View style={styles.top}>

            <View style={styles.head}>
              <View style={styles.intro}>
                <View style={styles.introLeft}>
                  <Avatar width={ScreenUtil.scaleSize(60)} name={nickname} avatar={avatar}/>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.nickName}>{nickname}</Text>
                      <View style={styles.memberButton}><Text style={styles.memberButtonText}>{grade}</Text></View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
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
                  <Icon name='settings' size={ScreenUtil.scaleSize(30)} color={Colors.text}/>
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
        return <View/>
      }
    } else {
      return (
        <View style={styles.head}>
          <View style={[styles.intro, styles.headNoLogin]}>
            <Avatar width={ScreenUtil.scaleSize(60)}/>
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
    if (this.props.bankInfo == null) {
      Toast.show('请先绑定支付宝')
      navigation.navigate &&
      navigation.navigate('BindingBankCardScreen')
    } else {
      navigation.navigate &&
      navigation.navigate('WithdrawalScreen')
    }
  }
  /**
   * 按钮操作
   * @private
   */
  _press = (nav, param) => {
    const {navigation} = this.props
    navigation.navigate &&
    navigation.navigate(nav, param)
  }
  /**
   * 网页链接
   * @param url
   * @param title
   * @private
   */
  _webPress = (url, title) => {
    const {navigation} = this.props
    url = AppConfig.webUrl + url
    //console.log(url,title)
    navigation.navigate &&
    navigation.navigate('WebScreen', {url, title})
  }
  /**
   * 刷新
   * @private
   */
  _onRefresh = () => {
    if (this.props.loggedIn) {
      this.props.getAccountInfo()
    }
  }

  render() {
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
          {this.props.loggedIn && (
            <TouchableOpacity style={styles.gridItem} onPress={() => this._press('FansScreen', {})}>
              <Image style={styles.gridIcon} source={require('../Images/users.png')}/>
              <Text>粉丝</Text>
            </TouchableOpacity>)}
          {this.props.loggedIn && (<TouchableOpacity style={styles.gridItem} onPress={() => this._press('InviteScreen', {})}>
            <Image style={styles.gridIcon} source={require('../Images/invite.png')}/>
            <Text>邀请</Text>
          </TouchableOpacity>)}
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article-category/1', '新手攻略')}>
            <Image style={styles.gridIcon} source={require('../Images/guide.png')}/>
            <Text>新手攻略</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article-category/2', '常见问题')}>
            <Image style={styles.gridIcon} source={require('../Images/questing.png')}/>
            <Text>常见问题</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => this._webPress('article/10', '联系客服')}>
            <Image style={styles.gridIcon} source={require('../Images/kefu.png')}/>
            <Text>联系客服</Text>
          </TouchableOpacity>
        </View>
        {this.props.loggedIn && (<View style={styles.rowItemGroup}>
          <RowItem title='修改密码' icon={require('../Images/change-password.png')} iconColor={Colors.blue}
                   onPress={() => this._press('ChangePasswordScreen',{})}/>
         <RowItem title='专属邀请码' icon={require('../Images/qrcode-scan.png')} iconColor={Colors.orange}
                   onPress={() => this._press('InviteScreen', {})}/>

        </View>)
        }

        <View style={styles.rowItemGroup}>
          <RowItem title='官方公告' icon={require('../Images/volume-up.png')} iconColor={Colors.blue}
                   onPress={() => this._webPress('article-category/4', '官方公告')}/>
          <RowItem title='意见反馈' icon={require('../Images/feedback.png')} iconColor={Colors.blue}
                   onPress={() => this._press('FeedbackScreen', {title: '意见反馈'})}/>
          <RowItem title='分享' icon={require('../Images/share.png')} iconColor={Colors.fire} onPress={this._copyInvitationCode}/>

        </View>
        <View/>
        {this.props.loggedIn && (<RoundedButton text={'退出'} onPress={() => this.props.logout()}/>)}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {mobile, nickname, invitation_code, grade, avatar, id} = state.userInfo
  const {accountInfo, bankInfo, fetching} = state.account
  let downloadUrl = AppSetSelectors.get(state.appSet, 'downloadUrl');
  let shareTitle = AppSetSelectors.get(state.appSet, 'shareTitle');
  let shareText = AppSetSelectors.get(state.appSet, 'shareText');
  let shareImage = AppSetSelectors.get(state.appSet, 'shareImage');
  let shareUrl = AppSetSelectors.get(state.appSet, 'shareUrl');

  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),
    grade,
    uid: id,
    mobile,
    nickname,
    invitation_code,
    downloadUrl,
    avatar,
    accountInfo,
    bankInfo,
    fetching,
    shareTitle,shareText,shareImage,shareUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(UserInfoActions.userInfoRequest()),
    logout: () => {
      dispatch(LoginActions.logout())
      dispatch(UserInfoActions.userInfoLogout())
      dispatch(AccountActions.accountLogout())
    },
    uploadAvatar: (fileUrl, fileName) => dispatch(UserInfoActions.uploadAvatarRequest(fileUrl, fileName)),
    getAccountInfo: () => dispatch(AccountActions.accountRequest()),
    getBankInfo: () => dispatch(AccountActions.bankInfoRequest()),
    postShare: (uid, content, img, url, title, platform, type, code, message,other) => dispatch(ShareActions.shareRequest({
      uid,
      content,
      img,
      url,
      title,
      platform,
      type,
      code,
      message,
      other
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen)
