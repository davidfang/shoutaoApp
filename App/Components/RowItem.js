import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Styles/RowItemStyle'
import {Colors, ScreenUtil} from '../Themes'

export default class RowItem extends React.Component {

  render() {
    const {title, icon, iconColor} = this.props
    let tintColor = {tintColor: iconColor}
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.left}>
          <Image style={[styles.leftImage,tintColor]} source={icon}/>
        </View>
        <View style={styles.right}>
          <View style={{paddingVertical: ScreenUtil.scaleHeight(10)}}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Icon name="keyboard-arrow-right" color={Colors.charcoal} size={ScreenUtil.scaleSize(18)}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

// Prop type warnings
RowItem.propTypes = {
  title: PropTypes.string.isRequired,
  //icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

// Defaults for props
RowItem.defaultProps = {
  title: '标题',
  //icon: 'md-reorder',
  iconColor: '#fb5f26'
}
