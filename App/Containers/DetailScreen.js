import React, {Component} from 'react'
import {Text, View, FlatList, TouchableOpacity,Clipboard,Linking} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
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
import {Metrics} from '../Themes'
import Toast from "../Lib/Toast";

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
    let {goodsInfo} = this.state
    this.destory = 1
    //alert('aaaaaa')
    //RNAlibcSdk.Show(goodsInfo.SPYHQTGLJ)
    Clipboard.setString(goodsInfo.tpwd)
    // 2、跳转代码
    Linking.canOpenURL('taobao://').then(supported => { // weixin://  alipay://
        if (supported) {
            Linking.openURL('taobao://')
           } else {
            Toast.showError('请先安装淘宝')
           }
       });
    //Toast.showSuccess('淘口令已复制到剪贴板，请打开淘宝购买')
  }

  _renderItem = ({item,index}) => {
    return (
      <AutoImage key={index}
        width={Metrics.screenWidth}
        style={styles.autoImage}
        source={{uri: item}}
        resizeMode='contain'
        resizeMethod='resize'
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
              fontSize: 18,
              paddingLeft: 10
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
    let {productInfo} = this.props
    if(productInfo.detail == null){//没有产品详情时

      fetch('http://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data={"item_num_id":"'+ goodsInfo.num_iid +'"}')
        .then(response => response.json())
        .then(responseJson => {
          //console.log(responseJson);
          this.props.setTbDetailRequest(goodsInfo.num_iid,responseJson.data.images)

        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    let {goodsInfo} = this.state
    let {productInfo} = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={() => this.props.navigation.goBack()}>
          <Icon name='chevron-left' size={24} color='#fff'
          />
        </TouchableOpacity>
        <FlatList
          ref={flat => (this._flatList = flat)}
          onScroll={this._onScroll}
          ListHeaderComponent={this._renderHeader}
          keyExtractor={(item, index) => index.toString()}
          data={productInfo.detail}
          ListEmptyComponent={<Empty text='~数据加载中~' />}
          renderItem={this._renderItem}
          initialNumToRender={2}
        />
        <ScrollToTop isShow={this.state.scrollIsShow} scrollTo={this._scrollToTop}/>
        <TouchableOpacity
          style={styles.buyCard}
          activeOpacity={1}
          onPress={this._goBuy}
        >
          <Text style={{marginLeft: 5, flex: 1}}>
            券后价：
            <Text style={{color: '#fc3616'}}>￥</Text>
            <Text
              style={styles.salePrice}
            >
              {MyMath.subtract(goodsInfo.zk_final_price, goodsInfo.coupon_info)}
            </Text>
          </Text>
          <View
            style={styles.coupon}
          >
            <Text style={{color: '#fff'}}>优惠券</Text>
            <Text style={{color: '#fff'}}>{goodsInfo.coupon_info}元</Text>
          </View>
          <View style={styles.getCoupon}>
            <Text
              style={styles.getCouponText}
            >
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
  return {
    smallImages: TbSelectors.getSmallImages(state.tb, params.goodsId),
    detailImages: TbSelectors.getDetailImages(state.tb, params.goodsId),
    guessLike: TbSelectors.getGuessLikePrds(state.tb, params.goodsId),
    productInfo: TbSelectors.getProductInfo(state.tb,params.goodsId),
    ...params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTbDetail: (goodsId) => dispatch(TbActions.tbDetailRequest(goodsId)),
    setTbDetailRequest: (goodsId,detail) => dispatch(TbActions.tbSetDetailRequest(goodsId,detail))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
