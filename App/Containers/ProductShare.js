import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Clipboard, Modal} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './Styles/ProductShareStyle'
import {Colors, Images, ScreenUtil} from "../Themes";
import {TbSelectors} from "../Redux/TbRedux";
import TbActions from "../Redux/TbRedux";
import UMShare from "../Lib/UMShareUtil";
import ShareActions from "../Redux/ShareRedux";
import {LoginSelector} from "../Redux/LoginRedux";
import Toast from "../Lib/Toast";

class ProductShare extends Component {
  constructor(props) {
    super(props)
    const {productInfo} = props

    this.state = {
      sharePic: productInfo.hasOwnProperty('share_pict_url') && productInfo.share_pict_url,
      modalVisible: false
    }
    if (!props.loggedIn) {
      this.props.navigation.navigate('LoginScreen')
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.productInfo.share_pict_url != this.props.productInfo.share_pict_url && this.state.sharePic == false){
      this.setState({sharePic:nextProps.productInfo.share_pict_url})
    }
  }

  componentDidMount() {
    const {productInfo} = this.props
    if (productInfo.tpwd == null) {
      this.props.getTpwdRequest(productInfo.num_iid)
    }
  }

  _priceImg = (img) => {
    this.setState({'sharePic': img})
  }
  _shareProductInfo = () => {
    const {productInfo, uid} = this.props
    let shareText = `${productInfo.short_title}
------
${productInfo.title}

【在售价】${productInfo.zk_final_price}
【券后价】${productInfo.real_price}
复制这条信息 ${productInfo.tpwd}，
打开【手机淘宝】即可查看
`
    Clipboard.setString(shareText)
    UMShare.share(shareText, '', '', '', 2, (code, message) => {
      console.warn(code, message)
      this.props.postShare(uid, shareText, '', '', '', 2, 2, code, message, '{}')
    })
  }
  _shareProdutPic = () => {
    if(this.state.sharePic) {
      const {productInfo, uid} = this.props
      let shareTitle = '分享产品图片 ' + productInfo.num_iid;
      let shareText = ''//shareContent;
      let shareImage = this.state.sharePic;
      let shareUrl = '';

      //调用模板分享
      UMShare.shareboard(shareText, shareImage, shareUrl, shareTitle,
        (code, message) => {
          console.warn(code, message);
          //console.warn(uid, shareText, shareImage, shareUrl, shareTitle)
          this.props.postShare(uid, shareText, shareImage, shareUrl, shareTitle, 2, 2, code, message, '{}')
        });
      //console.log('分享结束')
    }else{
      Toast.showError('分享图片正在加载中，请稍后分享',{})
    }
  }

  render() {
    const {productInfo} = this.props
    return (
      <View style={styles.container}>

        <Modal animationType="slide"
               transparent={true}
               visible={this.state.modalVisible}
               onRequestClose={() => this.setState({modalVisible:false})}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBackground}>
            <Text style={styles.modalTitleText}>奖励计算规则</Text>
            <Text style={styles.modalBodyText}>此处展示为卖家设置的佣金</Text>
            <Text style={styles.modalBodyText}>不同用户申请到的佣金不同</Text>
            <Text style={styles.modalBodyText}>最终以实际结算结果为准</Text>

              <TouchableOpacity style={styles.modalButton} onPress={()=>this.setState({modalVisible:false})}><Text style={styles.modalButtonText}>我知道了</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.commissionGroup}>
          <Text style={styles.commissionText}>奖励佣金预估:￥{productInfo.commission_amount}</Text>
          <Icon onPress={() => this.setState({modalVisible: true})} name='chevron-circle-right'
                size={ScreenUtil.scaleSize(12)} color='#fff'>规则</Icon>
        </View>
        <ScrollView>
          <View style={styles.textGroup}>
            <Text style={styles.titleText}>{productInfo.short_title}</Text>
            <Text style={styles.titleText}> ----------</Text>
            <Text style={styles.titleText}>{productInfo.title}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.priceText}>【在售价】{productInfo.zk_final_price}</Text>
            <Text style={styles.priceText}>【券后价】{productInfo.real_price}</Text>
            <Text style={styles.priceText}> ----------</Text>
            <Text style={styles.priceText}>复制这条信息 {productInfo.tpwd}，</Text>
            <Text style={styles.priceText}>打开【手机淘宝】即可查看</Text>
          </View>
          <View style={styles.imageGroup}>
            {productInfo.hasOwnProperty('share_pict_url') && <TouchableOpacity onPress={() => this._priceImg(productInfo.share_pict_url)}>
              <Icon style={[styles.checkIcon, styles.mainCheckIcon]} name='check-circle' size={ScreenUtil.scaleSize(12)}
                    color={productInfo.share_pict_url == this.state.sharePic ? 'red' : 'black'}/>
              <Image style={styles.shareMainPic} source={{uri: productInfo.share_pict_url}} resizeMode='contain'
                     resizeMethod='resize' loadingIndicatorSource={Images.load} defaultSource={Images.default}/>
            </TouchableOpacity>}
            {productInfo.small_images.map((img, key) =>
              <TouchableOpacity key={key} onPress={() => this._priceImg(img)}>
                <Icon style={styles.checkIcon} name='check-circle'
                      size={ScreenUtil.scaleSize(12)}
                      color={img == this.state.sharePic ? 'red' : 'black'}/>
                <Image style={styles.smallPic} source={{uri: img}}
                       resizeMode='contain'
                       resizeMethod='resize'
                       loadingIndicatorSource={Images.load}
                       defaultSource={Images.default}/>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View style={styles.viewWrap}>
          <TouchableOpacity style={[styles.button]}
                            onPress={this._shareProductInfo}
                            underlayColor={Colors.ember}>
            <Text style={styles.buttonText}>复制淘口令</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: Colors.bloodOrange}]}
                            onPress={this._shareProdutPic}
                            underlayColor={Colors.ember}>
            <Text style={styles.buttonText}>分享图片</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {navigation: {state: {params}}} = props
  return {
    loggedIn: LoginSelector.isLoggedIn(state.login),
    productInfo: TbSelectors.getProductInfo(state.tb, params.goodsId),
    uid: state.userInfo.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTpwdRequest: (goodsId) => dispatch(TbActions.tbTpwdRequest(goodsId)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductShare)
