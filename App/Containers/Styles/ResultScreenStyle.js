import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors, ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  searchBar: {
    paddingTop: Metrics.doubleBaseMargin,
  },
  backIcon: {
    width: ScreenUtil.scaleSize(30),
    height: ScreenUtil.scaleHeight(30),
    backgroundColor: Colors.windowTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ScreenUtil.scaleSize(30),
    position: 'absolute',
    left: ScreenUtil.scaleSize(25),
    top: ScreenUtil.scaleHeight(25),
    zIndex: 1000
  }
})
