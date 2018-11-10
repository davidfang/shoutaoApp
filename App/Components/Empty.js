import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/EmptyStyle'

export default class Empty extends Component {
  // Prop type warnings
  static propTypes = {
    text: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    text: '亲，产品上架中,稍后回来~'
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}
