import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styles from './Styles/AvatarStyle'
import { Images } from '../Themes'

export default class Avatar extends React.Component {

  render () {
    const {width, name, backgroundColor, avatar} = this.props
    if (avatar) {
      return (
        <Image source={{uri: avatar}} resizeMothod='resize'
               style={[{width: width, height: width, borderRadius: width / 2}, styles.container]}/>
      )
    } else {
      if(name) {
        return (
          <View style={[{width: width, height: width, borderRadius: width / 2, backgroundColor}, styles.container]}>
            <Text>{name}</Text>
          </View>
        )
      }else{
        return (
          <Image source={Images.icHead}
                 style={[{width: width, height: width,tintColor: '#CCCCCC', borderRadius: width / 2}, styles.container]}/>
        )
      }
    }
  }
}

// Prop type warnings
Avatar.propTypes = {
  width: PropTypes.number,
  name: PropTypes.string,
  backgroundColor: PropTypes.string,
  avatar: PropTypes.string
}

// Defaults for props
Avatar.defaultProps = {
  width: 60,
  backgroundColor: 'skyblue'
}
