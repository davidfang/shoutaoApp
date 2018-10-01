import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts,ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: Metrics.doubleBaseMargin,
    marginRight: Metrics.doubleBaseMargin
  },
  left: {
    flex: 1
  },
  leftImage:{
    width: ScreenUtil.scaleSize(25),
    height: ScreenUtil.scaleSize(25)
  },
  right: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.steel,
    borderBottomWidth: ScreenUtil.scaleHeight(0.5),
    marginLeft: Metrics.baseMargin
  },
  title: {
    ...Fonts.style.normal
  }
})
