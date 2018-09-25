import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from './Styles/ProductImagesStyle'
import {Images,ScreenUtil} from "../Themes";

export default class ProductImages extends Component {
  // Prop type warnings
  static propTypes = {
    source: PropTypes.array.isRequired
  }

  // Defaults for props
  static defaultProps = {
    source: []
  }

  render () {
    const {source} = this.props
    return (
      <View style={styles.swiper}>
        <Swiper
          height={ScreenUtil.scaleSize(140)}
          loop={true}
          index={0}
          autoplay={true}
          autoplayTimeout={5}
          horizontal={true}
        >
          {source && source.length >= 1 ? (
            source.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={styles.swiperImage}
                  source={{
                    uri: item
                  }}
                  resizeMode='cover'
                  resizeMethod='auto'
                  loadingIndicatorSource={Images.load}
                  defaultSource={Images.default}
                />
              )
            })
          ) : (
            <View/>
          )}
        </Swiper>
      </View>
    )
  }
}
