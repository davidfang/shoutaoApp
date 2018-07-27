import { StyleSheet } from 'react-native'
import {Colors} from '../../Themes'
export default StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44
  },
  footerText: {
    fontSize: 14,
    color: Colors.charcoal
  }
})
