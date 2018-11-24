import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text,Image } from 'react-native'
import MyMath from '../Lib/MyMath'
import styles from './Styles/ProductNameStyle'
import {Images} from "../Themes";

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
    let user_type = product.user_type ==0 ? Images.tb : Images.tm
    return (
      <View style={styles.product}>

        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.price}>
          <View style={styles.oldPrice}>
            <Image style={styles.saleImage} source={user_type}/>
            <Text>券后价</Text>
            <Text style={styles.salePrice}>￥{MyMath.subtract(product.zk_final_price , product.coupon_info_price)}</Text>
            <Text style={styles.rprice}>￥{product.zk_final_price}</Text>
          </View>
          <View style={styles.coupon}>
            <Text style={styles.couponTitle}>券</Text>
            <Text style={styles.couponInfo}>{product.coupon_info_price}</Text>
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
