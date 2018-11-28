import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import styles from './Styles/SectionListItemStyle'
import {is, Map} from 'immutable'
import MyMath from '../Lib/MyMath'
import {Colors, Images, ScreenUtil} from '../Themes'
import {onEventWithLable} from '../Lib/UMAnalyticsUtil'
import Icon from 'react-native-vector-icons/Entypo'

export default class SectionListItem extends Component {
  // Prop type warnings
  static propTypes = {
    product: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired
  }

  // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor(props) {
    super(props)
  }

  _onDetail = () => {
    const {product, navigation} = this.props
    onEventWithLable('detail', product.num_iid)
    navigation.navigate &&
    navigation.navigate('DetailScreen', {
      goodsId: product.num_iid,
      title: product.title,
      goodsInfo: product
    })
  }

  _onShareInfo = () => {
    const {product, navigation,loggedIn} = this.props
    onEventWithLable('shareInfo', product.num_iid)

    navigation.navigate &&
    navigation.navigate(loggedIn ? 'ProductShare':'LoginScreen', {
      goodsId: product.num_iid,
      title: product.title,
      goodsInfo: product
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(Map(this.props.product), Map(nextProps.product))
  }

  render() {
    const {product, navigation} = this.props
    //console.log('SectionListItem')
    let user_type = product.user_type == 0 ? Images.tb : Images.tm
    return (
      <TouchableOpacity
        onPress={this._onDetail}
        activeOpacity={1}
        style={styles.productItem}
      >
        <Image style={styles.zhutu} source={{uri: product.pict_url}} resizeMode='contain'
               resizeMethod='resize' loadingIndicatorSource={Images.load} defaultSource={Images.default}/>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.infoOther}>
            <View style={styles.infoOtherLeft}>
              <View style={styles.price}>
                <View style={styles.coupon}>
                  {/* 券信息 */}
                  {product.coupon_info_price > 0 && <Text style={styles.couponTitle}>券</Text>}
                  {product.coupon_info_price > 0 && <Text style={styles.couponInfo}>￥{product.coupon_info_price}</Text>}
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'baseline'}}
                >
                  <Text style={styles.priceLabel}>券后价</Text>
                  <Text
                    style={styles.cprice}>￥{product.real_price}</Text>
                </View>
              </View>
              <View style={styles.price}>
                <View style={styles.sale}>
                  <Image style={styles.saleImage} source={user_type}/>
                  <Text style={styles.saleInfo}>月销{product.volume}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'baseline'}}
                >
                  <Text style={styles.priceLabel}>原价</Text>
                  <Text style={styles.rprice}>￥{product.zk_final_price}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity  style={styles.share} onPress={this._onShareInfo} >
              <Icon name='export' size={ScreenUtil.scaleSize(14)} color={Colors.fire}/>
              <Text style={styles.zprice}>赚￥{product.commission_amount }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
