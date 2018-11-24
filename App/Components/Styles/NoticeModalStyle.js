import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors, Fonts, ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    padding: Metrics.baseMargin,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mask: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  noticeBackend: {
    //backgroundColor: Colors.white,
    //borderRadius: ScreenUtil.scaleSize(5),
    padding: ScreenUtil.scaleSize(5),
    marginBottom:ScreenUtil.scaleSize(30)
  },
  header: {
    flexDirection: 'row',
    alignSelf:'center'
  },
  titleText:{
    fontSize:ScreenUtil.setSpText(14)
  },
  content:{
    backgroundColor:Colors.silver,
    padding:ScreenUtil.scaleSize(5),
    marginVertical: Metrics.baseMargin
  },
  footer:{
    flexDirection: 'row',
    alignSelf:'flex-end'
  }
})
