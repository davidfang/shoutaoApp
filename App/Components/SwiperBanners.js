import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image } from 'react-native'

import Swiper from 'react-native-swiper'
import styles from './Styles/SWiperBannersStyle'
import {Images} from "../Themes";
import {onEventWithLable} from "../Lib/UMAnalyticsUtil";

export default class SwiperBanners extends Component {
  // // Prop type warnings
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }
  //
  // // Defaults for props
  static defaultProps = {
    datasource: []
  }
  constructor (props) {
    super(props)
  }

  _renderChild = () => {
    let navigate = this.props.navigation && this.props.navigation.navigate
    let lstImage = this.props.dataSource
    if (lstImage && lstImage.length >= 1) {
      return lstImage.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.swiperItem}
            onPress={() => {
              const nav = item.nav != null ? item.nav : 'html'
              //console.log(navigate)
              onEventWithLable('swiperBanner',item.title)
              navigate &&
              navigate(nav, {
                title: item.title,
                url: item.url,
                ...item.params
              })
            }}
          >
            <Image
              style={styles.swiperImage}
              source={{ uri: item.img }}
              resizeMode='stretch'
              resizeMethod='resize'
              defaultSource={Images.default}
            />
          </TouchableOpacity>
        )
      })
    } else {
      return <View />
    }
  }
  render() {
    return (
      <View style={styles.swiper}>
        <Swiper
          key={this.props.dataSource.length}
          height={150}
          loop={true}
          index={0}
          autoplay={true}
          horizontal={true}
        >
          {this._renderChild()}
        </Swiper>
      </View>
    )
  }
}
