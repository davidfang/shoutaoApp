import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors, Fonts, ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  /*container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 135
  },*/
  classify: {
    borderTopColor: Colors.border,
    borderTopWidth: ScreenUtil.scaleHeight(1),
    flex: Metrics.height,
    flexDirection: 'row',
    position: 'relative'
  },
  classifyItem: {
    width: Metrics.width / 2 - ScreenUtil.scaleSize(15),
    height: ScreenUtil.scaleHeight(72),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: ScreenUtil.scaleSize(10),
    marginBottom: ScreenUtil.scaleHeight(10),
    backgroundColor: Colors.white,
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: Colors.border
  },

  leftList: {
    width: 1 * Metrics.screenWidth / 4,
    backgroundColor: Colors.disabledBackGround
  },
  lItem: {
    minHeight: ScreenUtil.scaleHeight(44),
    justifyContent: 'center'
  },
  lText: {
    marginHorizontal: ScreenUtil.scaleSize(10),
    fontSize: Fonts.size.medium
  },
  rightList: {
    width: 3 * Metrics.screenWidth / 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white
  },
  rItem: {
    width: 3 * Metrics.screenWidth / 4 / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rHeader: {
    height: ScreenUtil.scaleHeight(30),
    width: Metrics.screenWidth * 3 / 4,
    //backgroundColor: Colors.windowTint,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: ScreenUtil.scaleHeight(55),
    width: ScreenUtil.scaleSize(55),
    marginVertical: ScreenUtil.scaleHeight(10),
    marginLeft: ScreenUtil.scaleSize(8)
  },
  categoryText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    color: Colors.descText
  }
})
