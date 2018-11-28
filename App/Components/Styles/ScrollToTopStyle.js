import { StyleSheet } from 'react-native'
import {ScreenUtil,Colors} from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  toTop: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: ScreenUtil.scaleSize(30),
    height: ScreenUtil.scaleSize(30),
    right: ScreenUtil.scaleSize(35),
    bottom: ScreenUtil.scaleSize(55),
    borderRadius:ScreenUtil.scaleSize(15),
    borderColor:Colors.descText,
    borderWidth:ScreenUtil.scaleSize(0.3),
    backgroundColor:Colors.steel
  }
})
