import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors, ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    //flex: 1,
    backgroundColor: Colors.frost,
    // width:Metrics.screenWidth
  },
  noticeText: {
    fontSize: ScreenUtil.setSpText(12),
    color: Colors.descText
  },
  noticeContainer: {
    overflow: 'scroll',
    // backgroundColor: 'green',
    height: ScreenUtil.scaleSize(20),
    padding: ScreenUtil.scaleSize(1),
    borderRadius: ScreenUtil.scaleSize(10),
    //borderWidth:ScreenUtil.scaleSize(.5),
    // borderColor:'red',
    width: ScreenUtil.scaleSize(320)
  },
  noticeImg: {
    width: ScreenUtil.scaleSize(25),
    height: ScreenUtil.scaleSize(25)
  }
})
