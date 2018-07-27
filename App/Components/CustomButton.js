import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/CustomButtonStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('CustomButton', () =>
  <CustomButton
    text='Hey there'
    onPress={() => window.alert('Full Button Pressed!')}
  />
)
export default class CustomButton extends Component {
  // Prop type warnings
  static propTypes = {
    onPress: PropTypes.object,
    text: PropTypes.string.isRequired
  }

  // Defaults for props
  static defaultProps = {
    text: '按钮'
  }

  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.styles]} onPress={this.props.onPress}>
        <Text
          style={[styles.buttonText, this.props.color && {color: this.props.color}]}>{this.props.text || this.props.children || ''}</Text>
      </TouchableOpacity>
    )
  }
}
