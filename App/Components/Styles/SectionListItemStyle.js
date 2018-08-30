import { StyleSheet } from 'react-native'
import {Colors, ScreenUtil} from '../../Themes'

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
    paddingLeft: ScreenUtil.scaleSize(5),
    justifyContent: 'space-around',
    height: ScreenUtil.scaleHeight(150)
  },
  title: {
    height: ScreenUtil.scaleHeight(40),
    alignItems: 'center'
  },
  coupon: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  couponTitle: {
    backgroundColor: Colors.orange,
    color: Colors.text,
    paddingHorizontal: ScreenUtil.scaleSize(3),
    borderWidth: 1,
    borderColor: Colors.orange,
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingHorizontal: ScreenUtil.scaleSize(5)
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
    flex: 1
  },
  price: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cprice: {
    color: Colors.selected,
    fontSize: ScreenUtil.setSpText(14),
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: ScreenUtil.scaleSize(5),
    textDecorationLine: 'line-through',
    flex: 1,
    fontSize: ScreenUtil.setSpText(12.5)
  },
  priceLabel:{
    fontSize:ScreenUtil.setSpText(12)
  }
})
