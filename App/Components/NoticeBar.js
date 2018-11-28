import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native'
import styles from './Styles/NoticeBarStyle'
import Icon from 'react-native-vector-icons/Octicons'
import Notice from './Notice'
import {ScreenUtil, Colors} from "../Themes";

export default class NoticeBar extends Component {
  // Prop type warnings
  static propTypes = {
    notices: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }

  // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  _renderItem = (item, index) => {
    let navigate = this.props.navigation && this.props.navigation.navigate
    return <TouchableOpacity
      key={index.toString()}
      style={[{justifyContent: 'center', marginVertical: 3}]}
      onPress={() => {
        item.hasOwnProperty('url') && navigate &&
        navigate('WebScreen', {
          title: item.title,
          url: item.url
        })
        console.log(item, index)
      }}
    >
      <Text style={styles.noticeText}>{item.title}</Text>
    </TouchableOpacity>
  }

  render() {
    const {notices} = this.props
    return (
      <View style={styles.row}>
        <Icon name='megaphone' size={ScreenUtil.scaleSize(20)} color={Colors.descText}/>
        <View style={styles.noticeContainer}>
          <Notice>
            {notices && notices.map(this._renderItem)}

          </Notice>
        </View>
      </View>
    );
  }
}
