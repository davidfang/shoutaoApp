import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text,Modal,TouchableWithoutFeedback,TouchableHighlight} from 'react-native'
import styles from './Styles/NoticeModalStyle'
import {Colors, ScreenUtil} from "../Themes";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class NoticeModal extends Component {
  // // Prop type warnings
  static propTypes = {
    animationType: PropTypes.string,
    transparent: PropTypes.bool,
    visible: PropTypes.bool
  }
  //
  // // Defaults for props
  static defaultProps = {
    animationType: "slide",
    transparent: true,
    visible: false
  }
  constructor (props) {
    super(props)
    this.state = {modalVisible: props.visible}
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render () {
    return (<Modal
          animationType={this.props.animationType}
          transparent={this.props.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible:false})}
        >
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>this.setState({modalVisible:false})}>
              <View  style={styles.mask}/>
            </TouchableWithoutFeedback>
            <View >
              {this.props.children}
            </View>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Icon name='close-circle-outline' size={ScreenUtil.scaleSize(30)} color={Colors.steel}    style={{alignSelf:'center'}} />
            </TouchableHighlight>
          </View>
        </Modal>
    )
  }
}
