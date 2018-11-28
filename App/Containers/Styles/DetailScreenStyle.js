import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backIcon: {
    width: ScreenUtil.scaleSize(30),
    height: ScreenUtil.scaleHeight(30),
    backgroundColor: Colors.windowTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ScreenUtil.scaleSize(30),
    position: 'absolute',
    left: ScreenUtil.scaleSize(25),
    top: ScreenUtil.scaleHeight(25),
    zIndex: 1000
  },
  autoImage: {
    margin: 0,
    padding: 0,
    resizeMode: 'stretch'
  },
  buyCard: {
    height: ScreenUtil.scaleHeight(40),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  coupon: {
    backgroundColor: Colors.orange,
    height: ScreenUtil.scaleHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: ScreenUtil.scaleSize(70)
  },
  getCoupon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.selected,
    width: ScreenUtil.scaleSize(100),
    height: ScreenUtil.scaleHeight(40)
  },
  getCouponText: {
    fontWeight: 'bold',
    fontSize: ScreenUtil.setSpText(11),
    color: Colors.text,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  detailLabel: {
    borderLeftColor: Colors.selected,
    borderLeftWidth: ScreenUtil.scaleSize(3),
    borderStyle: 'solid',
    height: ScreenUtil.scaleHeight(30),
    padding: ScreenUtil.scaleSize(3),
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginTop: ScreenUtil.scaleHeight(5)
  },
  salePrice: {
    fontSize: ScreenUtil.setSpText(9),
    color: Colors.selected,
    fontWeight: 'bold',
    marginHorizontal: ScreenUtil.scaleSize(5)
  },
  share: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    // paddingLeft: ScreenUtil.scaleSize(1),
    // width:ScreenUtil.scaleSize(40),
    backgroundColor:Colors.blue,
    height: ScreenUtil.scaleHeight(40)
  },
  zprice:{
    color:Colors.white,
    fontSize:ScreenUtil.setSpText(8)
  }

})
