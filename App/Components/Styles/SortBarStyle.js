import { StyleSheet } from 'react-native'
import {Colors} from '../../Themes'

export default StyleSheet.create({
  container: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.steel,
    backgroundColor: Colors.silver,
    flexDirection: 'row'
  },
  selected: {
    color: Colors.selected
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
