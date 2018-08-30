import { StyleSheet } from 'react-native'
import { Colors,ScreenUtil } from '../../Themes/'

export default StyleSheet.create({
  container: {
    //flex: 1,
    //paddingTop: Metrics.titlePadding
    alignItems: 'center',
    justifyContent: 'center',
    margin: ScreenUtil.scaleSize(5)
  },
  text: {
    color: Colors.bloodOrange,
    fontSize:ScreenUtil.setSpText(12)
  }
})
