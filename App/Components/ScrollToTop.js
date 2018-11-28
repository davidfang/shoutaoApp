import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {TouchableOpacity, Text} from 'react-native'
import styles from './Styles/ScrollToTopStyle'
import {Colors, ScreenUtil} from '../Themes'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
        <Icon name='arrow-collapse-up' size={ScreenUtil.scaleSize(15)} color={Colors.descText}/>
        <Text style={{fontSize:ScreenUtil.setSpText(8),color:Colors.charcoal}}>到顶</Text>
      </TouchableOpacity>
    ) : null
  }
}
