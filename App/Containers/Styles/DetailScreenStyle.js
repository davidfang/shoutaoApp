import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backIcon: {
    width: 30,
    height: 30,
    backgroundColor: Colors.windowTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    left: 25,
    top: 25,
    zIndex: 1000
  },
  autoImage: {
    margin: 0,
    padding: 0,
    resizeMode: 'stretch'
  },
  buyCard: {
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  coupon: {
    backgroundColor: Colors.orange,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70
  },
  getCoupon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.selected,
    width: 120,
    height: 50
  },
  getCouponText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  detailLabel:{
    borderLeftColor: Colors.selected,
    borderLeftWidth: 3,
    borderStyle: 'solid',
    height: 45,
    padding: 3,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginTop: 5
  },
  salePrice: {
    fontSize: 24,
    color: Colors.selected,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5
  },
})
