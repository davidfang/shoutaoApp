import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.isIOS ? ScreenUtil.scaleHeight(20) : 0
  },
  header: {
    backgroundColor: Colors.ricePaper,
    padding: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center'
  },
  scrollableTab: {
    flex: 1,
    backgroundColor: Colors.silver
  }
})
