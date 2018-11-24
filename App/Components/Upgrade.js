import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {View, Text, Linking, TouchableOpacity} from 'react-native'
import styles from './Styles/UpgradeStyle'
import NoticeModal from './NoticeModal'
import {Colors} from "../Themes";

export default class Upgrade extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  constructor(props) {
    super(props)
    this.state = {
      upgradeVisible: null != props.upgrade
    }
  }

  render() {
    const {upgrade} = this.props
    return (
      upgrade && <NoticeModal visible={this.state.upgradeVisible}>
        <View style={styles.upgradeBackend}>
          <View style={styles.upgradeHeader}>
            <Text style={styles.modalTitleText}>发现新版本</Text>
          </View>
          <View style={styles.upgradeContent}>
            <Text style={styles.modalBodyText}>{upgrade.description}</Text>
          </View>
          <View style={styles.upgradeFooter}>
            <TouchableOpacity style={styles.button} onPress={() => {
              this.setState({'upgradeVisible': false})
              Linking.openURL(upgrade.appUrl)

            }} underlayColor={Colors.ember}>
              <Text style={styles.buttonText}>马上升级</Text>
            </TouchableOpacity>
          </View>
        </View>
      </NoticeModal>
    )
  }
}
