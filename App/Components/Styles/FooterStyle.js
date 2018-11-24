import { StyleSheet } from 'react-native'
import {Colors,ScreenUtil} from '../../Themes'
export default StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: ScreenUtil.scaleSize(10),
    height: ScreenUtil.scaleHeight(44)
  },
  footerText: {
    fontSize: ScreenUtil.setSpText(10),
    color: Colors.charcoal
  }
})
