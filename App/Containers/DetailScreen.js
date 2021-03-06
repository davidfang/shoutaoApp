import React, {Component} from 'react'
import {Text, View, FlatList, TouchableOpacity, Clipboard, Linking} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import AutoImage from 'react-native-scalable-image'
import {connect} from 'react-redux'
import MyMath from '../Lib/MyMath'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import TbActions, {TbSelectors} from '../Redux/TbRedux'

import ScrollToTop from '../Components/ScrollToTop'
import ProductImages from '../Components/ProductImages'
import ProductName from '../Components/ProductName'
import GuessLike from '../Components/GuessLike'
import Empty from '../Components/Empty'
// Styles
import styles from './Styles/DetailScreenStyle'
import {Colors, Images, Metrics, ScreenUtil} from '../Themes'
import Toast from "../Lib/Toast";
import {onEventWithLable} from "../Lib/UMAnalyticsUtil";
import {LoginSelector} from "../Redux/LoginRedux";

class DetailScreen extends Component {

  constructor(props) {
    super(props)
    const {goodsId, title, goodsInfo} = this.props.navigation.state.params
    this.flag = 1
    this.state = {
      goodsId, title, goodsInfo,
      product: {},
      scrollIsShow: false
    }
  }

  _onScroll = e => {
    const offsetY = e.nativeEvent.contentOffset.y
    this.setState({
      scrollIsShow: offsetY > 100
    })
  }

  _scrollToTop = () => {
    this._flatList.scrollToOffset({offset: 0, animated: true})
  }
  _goBuy = () => {
    let {productInfo, loggedIn, taobaoPid} = this.props
    this.destory = 1
    //RNAlibcSdk.Show(goodsInfo.SPYHQTGLJ)
    //Clipboard.setString(productInfo.tpwd)//不用复制淘口令了
    onEventWithLable('buy', productInfo.num_iid)//友盟统计

    let coupon_share_url
    if (loggedIn) {//登录
      coupon_share_url = '//uland.taobao.com/coupon/edetail?activityId=' + productInfo.coupon_id + '&pid=' + taobaoPid + '&itemId=' + productInfo.num_iid
    } else {//没登录
      coupon_share_url = productInfo.coupon_share_url
    }
    this.props.getBuyRequest(productInfo.num_iid)
    // 2、跳转代码
    Linking.canOpenURL('taobao://').then(supported => { // weixin://  alipay://
      if (supported) {
        Linking.openURL('taobao:' + coupon_share_url)
      } else {
        Toast.showError('请先安装淘宝')
      }
    });
    //Toast.showSuccess('淘口令已复制到剪贴板，请打开淘宝购买')
  }

  _renderItem = ({item, index}) => {
    return (
      <AutoImage key={index}
                 width={Metrics.screenWidth}
                 style={styles.autoImage}
                 source={{uri: item}}
                 resizeMode='contain'
                 resizeMethod='resize'
                 loadingIndicatorSource={Images.load}
      />
    )
  }

  _renderHeader = () => {
    let {goodsInfo} = this.state
    let {smallImages, guessLike} = this.props
    return (
      <View>
        <ProductImages source={goodsInfo.small_images}/>
        <ProductName product={goodsInfo}/>
        <GuessLike goods={guessLike} navigation={this.props.navigation}/>
        <View
          style={styles.detailLabel}
        >
          <Text
            style={{
              fontSize: ScreenUtil.setSpText(12),
              paddingLeft: ScreenUtil.scaleSize(10)
            }}
          >
            商品详情
          </Text>
        </View>
      </View>
    )
  }

  componentDidMount() {
    const {smallImages, detailImages, guessLike} = this.props
    if (!smallImages.length && !detailImages.length && !guessLike.length) {
      //this.props.getTbDetail(this.state.goodsId)   暂时取消远程获取产品详情
    }
    let {goodsInfo} = this.state
    let {productInfo, taobaoDetailUrl} = this.props
    console.log(productInfo)
    // if(productInfo.tpwd == null){//获得淘口令
    //   this.props.getTpwdRequest(productInfo.num_iid)
    // }
    if (productInfo.detail == null) {//没有产品详情时
      console.log(taobaoDetailUrl)
      console.log(taobaoDetailUrl.replace(/<productId>/, goodsInfo.num_iid))
      fetch(taobaoDetailUrl.replace(/<productId>/, goodsInfo.num_iid))
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.hasOwnProperty('data')) {
            this.props.setTbDetailRequest(goodsInfo.num_iid, responseJson.data)
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  _onShareInfo = () => {
    const {productInfo, navigation,loggedIn} = this.props
    onEventWithLable('shareInfo', productInfo.num_iid)

    navigation.navigate &&
    navigation.navigate(loggedIn ? 'ProductShare':'LoginScreen', {
      goodsId: productInfo.num_iid,
      title: productInfo.title,
      goodsInfo: productInfo
    })
  }
  render() {
    let {goodsInfo} = this.state
    let {productInfo} = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={() => this.props.navigation.goBack()}>
          <Icon name='chevron-with-circle-left' size={ScreenUtil.scaleSize(24)} color='#fff'/>
        </TouchableOpacity>
        <FlatList
          ref={flat => (this._flatList = flat)}
          onScroll={this._onScroll}
          ListHeaderComponent={this._renderHeader}
          keyExtractor={(item, index) => index.toString()}
          data={productInfo.detail}
          ListEmptyComponent={<Empty text='~数据加载中~'/>}
          renderItem={this._renderItem}
          initialNumToRender={2}
        />
        <ScrollToTop isShow={this.state.scrollIsShow} scrollTo={this._scrollToTop}/>
        <TouchableOpacity
          style={styles.buyCard}
          activeOpacity={1}
          onPress={() => this._goBuy()}
        >
          <TouchableOpacity  style={styles.share} onPress={this._onShareInfo} >
            <Icon name='export' size={ScreenUtil.scaleSize(14)} color={Colors.white}>
            <Text style={styles.zprice}>分享赚￥{goodsInfo.commission_amount }</Text>
            </Icon>
          </TouchableOpacity>
          <Text style={{marginLeft: ScreenUtil.scaleSize(5), flex: 1,fontSize:ScreenUtil.setSpText(8)}}>
            券后价：
            <Text style={{color: '#fc3616',fontSize:ScreenUtil.setSpText(9)}}>￥</Text>
            <Text style={styles.salePrice}>
              {MyMath.subtract(goodsInfo.zk_final_price, goodsInfo.coupon_info_price)}
            </Text>
          </Text>
          <View style={styles.coupon}>
            <Text style={{color: '#fff',fontSize:ScreenUtil.setSpText(8)}}>优惠券</Text>
            <Text style={{color: '#fff',fontSize:ScreenUtil.setSpText(8)}}>{goodsInfo.coupon_info_price}元</Text>
          </View>
          <View style={styles.getCoupon}>
            <Text style={styles.getCouponText}>
              领券购买
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  //const {nav: {routes: [, {params}]}} = state
  const {navigation: {state: {params}}} = props
  const {taobao_pid} = state.userInfo
  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),
    taobaoPid: state.userInfo.hasOwnProperty('taobao_pid') ? state.userInfo.taobao_pid : null,
    smallImages: TbSelectors.getSmallImages(state.tb, params.goodsId),
    detailImages: TbSelectors.getDetailImages(state.tb, params.goodsId),
    guessLike: TbSelectors.getGuessLikePrds(state.tb, params.goodsId),
    productInfo: TbSelectors.getProductInfo(state.tb, params.goodsId),
    taobaoDetailUrl: state.appSet.payload.taobaoDetailUrl,
    ...params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTbDetail: (goodsId) => dispatch(TbActions.tbDetailRequest(goodsId)),
    setTbDetailRequest: (goodsId, detail) => dispatch(TbActions.tbSetDetailRequest(goodsId, detail)),
    getTpwdRequest: (goodsId) => dispatch(TbActions.tbTpwdRequest(goodsId)),
    getBuyRequest:(goodsId)=>dispatch(TbActions.tbBuyRequest(goodsId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
