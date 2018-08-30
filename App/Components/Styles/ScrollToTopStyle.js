import { StyleSheet } from 'react-native'
import {ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  toTop: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: ScreenUtil.scaleSize(45),
    height: ScreenUtil.scaleSize(45),
    right: ScreenUtil.scaleSize(35),
    bottom: ScreenUtil.scaleSize(55)
  }
})
