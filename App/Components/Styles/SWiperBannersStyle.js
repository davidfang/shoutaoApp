import { StyleSheet } from 'react-native'
import { Metrics, Colors ,ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  swiper: {
    width: Metrics.screenWidth,
    height: ScreenUtil.scaleHeight(150),
    padding: 0,
    margin: 0,
    backgroundColor: Colors.silver
  },
  swiperItem: {
    flex: 1,
    width: Metrics.screenWidth,
  },
  swiperImage: {
    flex: 1,
    width: Metrics.screenWidth
  }
})
