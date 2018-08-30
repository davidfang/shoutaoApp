import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {TouchableOpacity, Image} from 'react-native'
import styles from './Styles/ScrollToTopStyle'
import {ScreenUtil} from '../Themes'

export default class ScrollToTop extends Component {
  // // Prop type warnings
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    scrollTo: PropTypes.func.isRequired
  }
  //
  // // Defaults for props
  static defaultProps = {
    isShow: false
  }

  render() {
    const {isShow, scrollTo} = this.props
    const _onPress = () => {
      scrollTo && scrollTo()
    }
    return isShow ? (
      <TouchableOpacity style={styles.toTop} activeOpacity={1} onPress={_onPress}>
        <Image
          source={require('../Images/scroll.png')}
          style={{height: ScreenUtil.scaleSize(32), width: ScreenUtil.scaleSize(32)}}
        />
      </TouchableOpacity>
    ) : null
  }
}
