import { StyleSheet } from 'react-native'
import {Colors} from '../../Themes'

export default StyleSheet.create({
  productItem: {
    height: 150,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  zhutu: {
    width: 150,
    height: 150
  },
  info: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-around'
  },
  title: {
    height: 40,
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
    paddingLeft: 3,
    paddingRight: 3,
    borderWidth: 1,
    borderColor: Colors.orange,
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingLeft: 5,
    paddingRight: 5
  },
  sale: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  saleImage: {
    width: 18,
    height: 18,
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
    color: Colors.selected,
    fontSize: 16,
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: 5,
    textDecorationLine: 'line-through',
    flex: 1,
    fontSize: 13
  }
})
