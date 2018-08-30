import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors, ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  listView: {
    flex: 1
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    margin: ScreenUtil.scaleSize(10),
    padding: ScreenUtil.scaleSize(5),
    paddingVertical: ScreenUtil.scaleHeight(10),
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
})
