import { StyleSheet } from 'react-native'
import {Colors, ScreenUtil, Metrics} from '../../Themes'

export default StyleSheet.create({
  productItem: {
    height: ScreenUtil.scaleHeight(150),
    flexDirection: 'row',
    padding: ScreenUtil.scaleSize(10),
    backgroundColor: Colors.white,
    borderBottomWidth: ScreenUtil.scaleHeight(1),
    borderBottomColor: Colors.border
  },
  zhutu: {
    width: ScreenUtil.scaleSize(150),
    height: ScreenUtil.scaleHeight(150)
  },
  info: {
    flex: 1,
    width: Metrics.screenWidth - ScreenUtil.scaleSize(150),
    paddingLeft: ScreenUtil.scaleSize(5),
    paddingRight: ScreenUtil.scaleSize(5),
    justifyContent: 'space-around',
    height: ScreenUtil.scaleHeight(150)
  },
  title: {
    height: ScreenUtil.scaleHeight(45),
    fontSize: ScreenUtil.setSpText(12),
    alignItems: 'center'
  },
  coupon: {
    flexDirection: 'row',
    //flex: 1,
    alignItems: 'center'
  },
  couponTitle: {
    backgroundColor: Colors.orange,
    color: Colors.text,
    paddingHorizontal: ScreenUtil.scaleSize(3),
    borderWidth: 1,
    borderColor: Colors.orange,
    fontSize: ScreenUtil.setSpText(11),
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingHorizontal: ScreenUtil.scaleSize(5),
    fontSize: ScreenUtil.setSpText(11)
  },
  sale: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  saleImage: {
    width: ScreenUtil.scaleSize(16),
    height: ScreenUtil.scaleSize(16),
    resizeMode: 'stretch'
  },
  saleInfo: {
    //flex: 1,
    fontSize: ScreenUtil.setSpText(8)
  },
  price: {
    flexDirection: 'row',
    // flex: 1,
    //alignItems: 'center',
    justifyContent: 'space-around',
    // paddingLeft: ScreenUtil.scaleSize(5),
    // paddingRight: ScreenUtil.scaleSize(5),

  },
  cprice: {
    color: Colors.selected,
    fontSize: ScreenUtil.setSpText(13),
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: ScreenUtil.scaleSize(5),
    textDecorationLine: 'line-through',
    //flex: 1,
    fontSize: ScreenUtil.setSpText(13)
  },
  priceLabel:{
    fontSize:ScreenUtil.setSpText(10)
  }
})
