import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {View, Image, Text, Linking, TouchableOpacity} from 'react-native'
import styles from './Styles/BestSellingStyle'
import {Colors} from "../Themes";
import NoticeModal from './NoticeModal'

export default class BestSelling extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.object,
    navigation: PropTypes.object.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor(props) {
    super(props)
    this.state = {
      Visible: null != props.data
    }
  }

  render() {
    let navigate = this.props.navigation && this.props.navigation.navigate
    const {data} = this.props
    return (
      data && <NoticeModal visible={this.state.Visible} ref={modal => (this._modal = modal)}>
        <TouchableOpacity
          //style={styles.item}
          onPress={() => {
            const nav = data.nav != null ? data.nav : 'WebScreen'
            //console.log(navigate,nav)
            this._modal.setModalVisible(false)
            navigate && navigate(nav, {
              title: data.title,
              url: data.url,
              ...data.params
            })


          }}
        >
          <Image
            //style={styles.image}
            style={{width: data.params.width, height: data.params.height}}
            source={typeof(data.img) == 'string' ? {uri: data.img} : data.img}
            resizeMode='contain'
            resizeMethod='resize'
          />
        </TouchableOpacity>
      </NoticeModal>
    )
  }
}
