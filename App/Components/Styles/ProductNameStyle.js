import { StyleSheet } from 'react-native'
import {Metrics, Colors, ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  product: {
    backgroundColor: Colors.silver,
    width: Metrics.screenWidth,
    padding:  ScreenUtil.scaleSize(10),
    justifyContent: 'space-around'
  },
  name: {
    width: '100%',
    textAlignVertical: 'center',
    flexDirection: 'row',
    paddingBottom: ScreenUtil.scaleHeight(5)
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  salePrice: {
    fontSize: ScreenUtil.setSpText(18),
    color: Colors.selected,
    fontWeight: 'bold',
    marginHorizontal: ScreenUtil.scaleSize(5)
  },
  saleImage: {
    width: ScreenUtil.scaleHeight(16),
    height: ScreenUtil.scaleHeight(16),
    resizeMode: 'stretch'
  },
  oldPrice: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  rprice: {
    textDecorationLine: 'line-through'
  },
  coupon: {
    flexDirection: 'row',
    height:  ScreenUtil.scaleSize(30),
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  couponTitle: {
    backgroundColor: Colors.orange,
    color: Colors.text,
    paddingHorizontal:  ScreenUtil.scaleSize(10),
    borderWidth:  ScreenUtil.scaleSize(1),
    borderColor: Colors.orange,
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth:  ScreenUtil.scaleSize(1),
    borderColor: Colors.orange,
    paddingHorizontal:  ScreenUtil.scaleSize(15),
    paddingRight:  ScreenUtil.scaleSize(10)
  },
  xiangguanatuijian: {
    color: Colors.text,
    textAlign: 'center'
  }
})
