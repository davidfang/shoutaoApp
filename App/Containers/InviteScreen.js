import React, {Component} from 'react'
import {ScrollView, Text, TouchableOpacity, View, Image, Clipboard,RefreshControl} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import InviteActions from '../Redux/InviteRedux'

// Styles
import styles from './Styles/InviteScreenStyle'
import {Colors, Images, Metrics} from "../Themes";
import Toast from "../Lib/Toast";
import UMShare from "../Lib/UMShareUtil";
import ShareActions from "../Redux/ShareRedux";
import ScreenUtil from "../Themes/ScreenUtil";
import {LoginSelector} from "../Redux/LoginRedux";

class InviteScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {pic: 0}
  }

  componentDidMount() {
    if (this.props.shareImages == null) {
      this.props.getInvite()
    }
  }

  /**
   * 复制邀请码信息
   * @private
   */
  _copyInvitationCode = () => {
    let {
      shareImages,
      shareContent, waterMark, uid, invitation_code
    } = this.props
    Clipboard.setString(this.props.shareContent)
    Toast.showSuccess('邀请码已复制，发给好友一起赚钱吧！')
    UMShare.share(shareContent,'','','',2,(code,message)=> {
      console.warn(code,message)
      this.props.postShare(uid, shareContent, '', '', '', 2, 2, code, message, '{}')
    })
  }
  /**
   * 分享
   * @private
   */
  _share = () => {
    //console.log('分享开始')
    //console.log(UMShare)
    // let {shareTitle,shareText,shareImage,shareUrl,uid,invitation_code} = this.props
    let {
      shareImages,
      shareContent, waterMark, uid, invitation_code
    } = this.props


    //console.log(this.state.pic)
    //return




    let shareTitle = '专属邀请码';
    let shareText = ''//shareContent;
    let shareImage = shareImages[this.state.pic] + waterMark;
    let shareUrl = '';

    //调用模板分享
    UMShare.shareboard(shareText, shareImage, shareUrl, shareTitle,
      (code, message) => {
        console.warn(code, message);
        //console.warn(uid, shareText, shareImage, shareUrl, shareTitle)
        this.props.postShare(uid, shareText, shareImage, shareUrl, shareTitle, 2, 2, code, message, '{}')
      });
    //console.log('分享结束')
  }
  /**
   * 更换模板
   * @param event
   * @private
   */
  _changePic = (event) => {
    let x = event.nativeEvent.contentOffset.x
    //let size = Metrics.screenWidth - ScreenUtil.scaleSize(60) + Metrics.doubleBaseMargin * 2 + Metrics.smallMargin * 2
    let size = Math.floor(Metrics.screenWidth - ScreenUtil.scaleSize(50) + Metrics.doubleBaseMargin * 2) //+ Metrics.smallMargin * 2
    //console.warn('x:',Math.floor(event.nativeEvent.contentOffset.x));//水平滚动距离
    //console.log(event.nativeEvent.contentOffset.y);//垂直滚动距离
    this.setState({pic: Math.floor(x / size)},()=>this.state.pic)
  }
  _stateFunction(x,size) {
    this.setState({pic: Math.floor(x / size)})
  }
  /**
   * 下拉刷新
   * @private
   */
  _onRefreshing=()=>{
    this.props.getInvite()
  }
  render() {
    let {shareImages,waterMark} = this.props
    return (
      <View style={styles.container}>
        <ScrollView refreshControl={
          <RefreshControl
            onRefresh={this._onRefreshing}
            refreshing={this.props.fetching}
            title={this.props.fetching ? '刷新数据中' : '松开立即更新'}
          />
        }>
          {this.props.loggedIn ?
          <Text style={[styles.description, styles.textCenter]}>分享专属海报，新用户可免邀请码注册，关系自动绑定</Text>
            :
          <Text style={[styles.description, styles.textCenter]}>注意:您还未登录，分享默认二维码,登录获得专属二维码</Text>}
          <ScrollView ref={flat => (this._scrollView = flat)}
                      style={{flex: 1}} horizontal={true} pagingEnabled={true} onScroll={this._changePic}>
            {shareImages && shareImages.map((shareImage) => <Image key={shareImage} source={{
              uri: shareImage + waterMark
            }}
                                                                                         style={styles.image}
                                                                                         resizeMode='contain'
                                                                                         resizeMethod='auto'
                                                                                         loadingIndicatorSource={Images.load}
                                                                                         defaultSource={Images.default}/>)

            }

          </ScrollView>
          <Text style={[styles.description, styles.textCenter]}>新用户扫二维码→下载APP→点击微信登录</Text>
          <Text>邀请规则</Text>
          <Text style={styles.description}>
            1.专属海报中的二维码已包含您的邀请码信息；
          </Text>
          <Text style={styles.description}>
            2.好友通过您的二维码海报下载APP并注册成为会员后，Ta将永久成为您的粉丝，未来Ta升级超级会员或领券下单时产生的奖励收入均计入您的账户中；
          </Text>
          <Text style={styles.description}>
            3.您的粉丝领券下单并确认收货后，Ta将获得80%消费佣金，您将获得12%消费佣金；
          </Text>
          <Text style={styles.description}>
            4.Ta的粉丝领券下单并确认收货后，Ta的粉丝将获得80%消费佣金，Ta将获得12%消费佣金，APP还将额外奖励您8%消费佣金。
          </Text>
        </ScrollView>
        <View>
          <View style={styles.viewWrap}>
            <TouchableOpacity style={[styles.button]}
                              onPress={this._copyInvitationCode}
                              underlayColor={Colors.ember}>
              <Text style={styles.buttonText}>复制注册口令</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: Colors.bloodOrange}]}
                              onPress={this._share}
                              underlayColor={Colors.ember}>
              <Text style={styles.buttonText}>分享专属海报</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {shareContent, images, waterMark} = state.invite.payload
  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),
    invitation_code: state.userInfo.invitation_code,
    uid: state.userInfo.id,
    shareImages: images,
    shareContent, waterMark,
    fetching: state.invite.fetching, // 加载
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInvite: () => dispatch(InviteActions.inviteRequest()),
    postShare: (uid, content, img, url, title, platform, type, code, message, other) => dispatch(ShareActions.shareRequest({
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

export default connect(mapStateToProps, mapDispatchToProps)(InviteScreen)
