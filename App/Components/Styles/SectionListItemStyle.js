import {StyleSheet} from 'react-native'
import {Colors, ScreenUtil, Metrics} from '../../Themes'

export default StyleSheet.create({
  productItem: {
    height: ScreenUtil.scaleHeight(130),
    flexDirection: 'row',
    padding: ScreenUtil.scaleSize(5),
    backgroundColor: Colors.white,
    borderBottomWidth: ScreenUtil.scaleHeight(1),
    borderBottomColor: Colors.border,
    alignItems: 'flex-start'
  },
  zhutu: {
    width: ScreenUtil.scaleSize(120),
    height: ScreenUtil.scaleHeight(120)
  },
  info: {
    flex: 1,
    width: Metrics.screenWidth - ScreenUtil.scaleSize(120),
    paddingLeft: ScreenUtil.scaleSize(5),
    paddingRight: ScreenUtil.scaleSize(5),
    justifyContent: 'space-around',
    height: ScreenUtil.scaleHeight(120)
  },
  title: {
    height: ScreenUtil.scaleHeight(45),
    fontSize: ScreenUtil.setSpText(10),
    alignItems: 'center'
  },
  infoOther: {
    display: 'flex',
    flexDirection: 'row',
    // width: Metrics.screenWidth - ScreenUtil.scaleSize(130),
    height:ScreenUtil.scaleHeight(100),
    justifyContent: 'space-around',
    alignItems:'center'
  },
  infoOtherLeft:{
    flex:4,
    borderColor: Colors.orange,
    borderRightWidth: ScreenUtil.scaleSize(1),
    paddingRight: Metrics.baseMargin,
    marginVertical: Metrics.baseMargin
  },
  share: {
    //flex: 1,
    alignItems:'center',
    paddingLeft: ScreenUtil.scaleSize(1),
    width:ScreenUtil.scaleSize(50),
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
    fontSize: ScreenUtil.setSpText(8),
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingHorizontal: ScreenUtil.scaleSize(5),
    fontSize: ScreenUtil.setSpText(8)
  },
  sale: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  saleImage: {
    width: ScreenUtil.scaleSize(14),
    height: ScreenUtil.scaleSize(14),
    resizeMode: 'stretch'
  },
  saleInfo: {
    //flex: 1,
    fontSize: ScreenUtil.setSpText(8)
  },
  price: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
    // paddingLeft: ScreenUtil.scaleSize(5),
    // paddingRight: ScreenUtil.scaleSize(5),

  },
  cprice: {
    color: Colors.selected,
    fontSize: ScreenUtil.setSpText(10),
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: ScreenUtil.scaleSize(5),
    textDecorationLine: 'line-through',
    //flex: 1,
    fontSize: ScreenUtil.setSpText(9)
  },
  zprice:{
    color:Colors.fire,
    fontSize:ScreenUtil.setSpText(8)
  },
  priceLabel: {
    fontSize: ScreenUtil.setSpText(8),
    color: Colors.descText
  }
})
