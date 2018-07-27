import { StyleSheet } from 'react-native'
import {Metrics,Colors} from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  product: {
    backgroundColor: Colors.silver,
    width: Metrics.screenWidth,
    padding: 10,
    justifyContent: 'space-around'
  },
  name: {
    width: '100%',
    textAlignVertical: 'center',
    flexDirection: 'row',
    paddingBottom: 5
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  salePrice: {
    fontSize: 18,
    color: Colors.selected,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5
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
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  couponTitle: {
    backgroundColor: Colors.orange,
    color: Colors.text,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: Colors.orange,
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingLeft: 15,
    paddingRight: 10
  },
  xiangguanatuijian: {
    color: Colors.text,
    textAlign: 'center'
  }
})
