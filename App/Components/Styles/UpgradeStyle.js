import {StyleSheet} from 'react-native'
import {Colors, Metrics,ApplicationStyles} from "../../Themes";
import ScreenUtil from "../../Themes/ScreenUtil";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modalTitleText: {
    fontSize: ScreenUtil.setSpText(14),
    alignSelf: 'center'
  },
  modalBodyText: {
    fontSize: ScreenUtil.setSpText(12),
    color: Colors.descText
  },
  slide: {
    width: Metrics.screenWidth * 0.8,
    overflow: 'scroll'
  },
  upgradeBackend:{
    backgroundColor: Colors.white,
    borderRadius: ScreenUtil.scaleSize(5),
    width: Metrics.screenWidth * 0.8,
    padding: ScreenUtil.scaleSize(5)
  },
  upgradeHeader: {
    flexDirection: 'row',
    alignSelf:'center'
  },
  upgradeContent:{
    backgroundColor:Colors.silver,
    padding:ScreenUtil.scaleSize(5),
    marginVertical: Metrics.baseMargin
  },
  upgradeFooter:{
    flexDirection: 'row',
    alignSelf:'flex-end'
  }
})
