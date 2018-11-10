import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors, Fonts} from '../../Themes'
import ScreenUtil from "../../Themes/ScreenUtil";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    // flex: 1,
    height: Metrics.screenHeight * 0.9,
    backgroundColor: Colors.silver
  },
  row: {
    flex: 1,
    backgroundColor: Colors.white,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    paddingVertical: 10,
    borderRadius: Metrics.smallMargin
  },
  rowItem: {
    justifyContent: 'space-between',
    marginVertical: Metrics.smallMargin,
    flexDirection: 'row'
  },
  priceGroup: {
    width: Metrics.screenWidth / 3,
    paddingVertical: Metrics.baseMargin,
    justifyContent: 'center'
  },
  priceLabel: {
    textAlign: 'center',
    color: Colors.descText,
    fontSize: ScreenUtil.setSpText(12)
  },
  price: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.descText,
    fontFamily: Fonts.type.bold,
    fontSize: ScreenUtil.setSpText(14)
  },
  productTitle: {
    alignSelf: 'flex-start',
    color: Colors.black,
    textAlign: 'left',
    fontSize: ScreenUtil.setSpText(12),
    marginBottom: Metrics.smallMargin,
    width: Metrics.screenWidth / 10 * 6,
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'left',
    color: Colors.steel,
    textAlign: 'center'
  },
  time: {
    textAlign: 'left',
    color: Colors.charcoal
  },
  listContent: {
    flex: Metrics.height,
    marginTop: Metrics.baseMargin
  },
  buttonBlue:{
    borderRadius: ScreenUtil.scaleSize(5),
    width:ScreenUtil.scaleSize(40),
    height:ScreenUtil.scaleSize(20),
    backgroundColor:Colors.blue,
    justifyContent: 'center'
  },
  buttonGreen:{
    borderRadius: ScreenUtil.scaleSize(5),
    width:ScreenUtil.scaleSize(40),
    height:ScreenUtil.scaleSize(20),
    backgroundColor:Colors.green,
    justifyContent: 'center'
  },
  buttonGray:{
    borderRadius: ScreenUtil.scaleSize(5),
    width:ScreenUtil.scaleSize(40),
    height:ScreenUtil.scaleSize(20),
    backgroundColor:Colors.gray,
    justifyContent: 'center'
  },
  buttonText:{
    color:Colors.white,
    fontSize:ScreenUtil.setSpText(10),
    alignSelf: 'center'
  }
})
