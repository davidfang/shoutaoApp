import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'

export default StyleSheet.create({
  container: {
    //flex: 1,
    //height: 200
    padding:3,
    backgroundColor:Colors.silver
  },
  productItem: {
    height: 200,
    width: Metrics.screenWidth * 0.3,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: Colors.silver,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'flex-start'
  },
  zhutu: {
    width: Metrics.screenWidth * 0.3,
    height: 100
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
    top: -20
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
    color: Colors.fire,
    fontSize: 15,
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: 5,
    textDecorationLine: 'line-through',
    flex: 1,
    fontSize: 12
  }
})
