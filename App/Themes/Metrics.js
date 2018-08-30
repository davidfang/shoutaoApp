import {Dimensions, Platform} from 'react-native'
import ScreenUtil from './ScreenUtil'
const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: ScreenUtil.scaleSize(10),
  marginVertical: ScreenUtil.scaleHeight(10),
  section: ScreenUtil.scaleSize(25),
  baseMargin: ScreenUtil.scaleSize(10),
  doubleBaseMargin: ScreenUtil.scaleSize(20),
  smallMargin: ScreenUtil.scaleSize(5),
  doubleSection: ScreenUtil.scaleSize(50),
  horizontalLineHeight: ScreenUtil.scaleHeight(1),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? ScreenUtil.scaleHeight(64) : ScreenUtil.scaleHeight(54),
  buttonRadius: ScreenUtil.scaleSize(4),
  icons: {
    tiny: ScreenUtil.scaleSize(15),
    small: ScreenUtil.scaleSize(20),
    medium: ScreenUtil.scaleSize(30),
    large: ScreenUtil.scaleSize(45),
    xl: ScreenUtil.scaleSize(50)
  },
  images: {
    small: ScreenUtil.scaleSize(20),
    medium: ScreenUtil.scaleSize(40),
    large: ScreenUtil.scaleSize(60),
    logo: ScreenUtil.scaleSize(200)
  },
  isIOS: Platform.OS === 'ios'
}

export default metrics
