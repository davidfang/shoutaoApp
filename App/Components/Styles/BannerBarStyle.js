import { StyleSheet } from 'react-native'
import { Metrics, Colors,ScreenUtil } from '../../Themes'

export default StyleSheet.create({
  container: {
    width: Metrics.width,
    //height: ScreenUtil.scaleHeight(100),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.silver
  },
  item: {
    //flex: 1,
    height: ScreenUtil.scaleHeight(75),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ScreenUtil.scaleSize(5)
  },
  image: {
    width: ScreenUtil.scaleSize(50),
    height: ScreenUtil.scaleHeight(50)
  },
  title: {
    marginTop: ScreenUtil.scaleHeight(5),
    textAlign: 'center'
  }
})
