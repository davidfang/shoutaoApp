import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import styles from './Styles/SectionListItemStyle'
import {is, Map} from 'immutable'
import MyMath from '../Lib/MyMath'
import {Images} from '../Themes'
import {onEventWithLable} from '../Lib/UMAnalyticsUtil'

export default class SectionListItem extends Component {
  // Prop type warnings
  static propTypes = {
    product: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  }

  // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor(props) {
    super(props)
  }

  _onRedirect = () => {
    const {product, navigation} = this.props
    onEventWithLable('detail',product.num_iid)
    navigation.navigate &&
    navigation.navigate('DetailScreen', {
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
        onPress={this._onRedirect}
        activeOpacity={1}
        style={styles.productItem}
      >
        <Image style={styles.zhutu} source={{uri: product.pict_url}} resizeMode='contain'
               resizeMethod='resize' loadingIndicatorSource={Images.load} defaultSource={Images.default}/>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.price}>
            <View style={styles.coupon}>
              {/* 券信息 */}
              <Text style={styles.couponTitle}>券</Text>
              <Text style={styles.couponInfo}>￥{product.coupon_info}</Text>
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}
            >
              <Text style={styles.priceLabel}>券后价</Text>
              <Text style={styles.cprice}>￥{MyMath.subtract(product.zk_final_price, product.coupon_info)}</Text>
            </View>
          </View>
          <View style={styles.price}>
            <View style={styles.sale}>
              <Image style={styles.saleImage} source={user_type}/>
              <Text style={styles.saleInfo}>月销{product.volume}</Text>
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}
            >
              <Text style={styles.priceLabel}>原价</Text>
              <Text style={styles.rprice}>￥{product.zk_final_price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
