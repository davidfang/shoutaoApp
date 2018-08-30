import { StyleSheet } from 'react-native'
import {Colors, Metrics, ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  container: {
    //flex: 1,
    //height: 200
    padding:ScreenUtil.scaleSize(3),
    backgroundColor:Colors.silver
  },
  productItem: {
    height: ScreenUtil.scaleHeight(200),
    width: Metrics.screenWidth * 0.3,
    flexDirection: 'column',
    padding: ScreenUtil.scaleSize(5),
    backgroundColor: Colors.silver,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'flex-start'
  },
  zhutu: {
    width: Metrics.screenWidth * 0.3,
    height: ScreenUtil.scaleHeight(100)
  },
  info: {
    flex: 1,
    //paddingLeft: 5,
    // justifyContent: 'flex-start'
  },
  title: {
    // height: 40,
    alignItems: 'center'
  },
  coupon: {
    flexDirection: 'row',
    alignItems: 'center',
    top: - ScreenUtil.scaleHeight(20)
  },
  couponTitle: {
    backgroundColor: Colors.orange,
    color: Colors.text,
    paddingHorizontal: ScreenUtil.scaleSize(3),
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: Colors.orange,
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: Colors.orange,
    paddingHorizontal: ScreenUtil.scaleSize(5)
  },
  sale: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  saleImage: {
    width: ScreenUtil.scaleSize(18),
    height: ScreenUtil.scaleHeight(18),
    resizeMode: 'stretch'
  },
  saleInfo: {
    flex: 1
  },
  price: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cprice: {
    color: Colors.fire,
    fontSize: ScreenUtil.setSpText(15),
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: ScreenUtil.scaleSize(5),
    textDecorationLine: 'line-through',
    flex: 1,
    fontSize: ScreenUtil.setSpText(12)
  }
})
