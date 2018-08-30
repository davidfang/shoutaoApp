import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors,ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: ScreenUtil.setSpText(20),
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: ScreenUtil.scaleSize(200),
    height: ScreenUtil.scaleSize(200),
    alignSelf: 'center'
  }
})
