import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/ProductNameStyle'

export default class ProductName extends Component {
  // Prop type warnings
  static propTypes = {
    product: PropTypes.object.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    let {product} = this.props
    return (
      <View style={styles.product}>
        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.price}>
          <View style={styles.oldPrice}>
            <Text>券后价</Text>
            <Text style={styles.salePrice}>￥{product.zk_final_price_wap - product.coupon_info}</Text>
            <Text style={styles.rprice}>￥{product.zk_final_price}</Text>
          </View>
          <View style={styles.coupon}>
            <Text style={styles.couponTitle}>券</Text>
            <Text style={styles.couponInfo}>{product.coupon_info}</Text>
          </View>
          <Text >已售{product.volume}件</Text>
        </View>
        <Text
          style={styles.xiangguanatuijian}
        >
          -----相关推荐-----
        </Text>
      </View>
    )
  }
}
