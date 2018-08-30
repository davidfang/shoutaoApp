import { StyleSheet } from 'react-native'
import { Colors,ScreenUtil } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.background
  },
  icon: {
    width: ScreenUtil.scaleSize(24),
    height: ScreenUtil.scaleSize(24)
  },
  headerTitleStyle: {
    color: Colors.text,
    alignSelf: 'center'
  }
})
