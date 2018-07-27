import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    width: Metrics.width,
    backgroundColor: Colors.silver
  },
  header: {
    backgroundColor: Colors.silver,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lanmu: {
    height: 22,
    width: '100%',
    resizeMode: 'contain'
  },
  body: {
    height: 200,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    borderRightColor: Colors.silver,
    borderRightWidth: 1
  },
  right: {
    flex: 2
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: Colors.border,
    borderBottomWidth: 1
  },
  bottom: {
    flex: 1,
    flexDirection: 'row'
  },
  subLeft: {
    flex: 1,
    borderRightColor: Colors.border,
    borderRightWidth: 1
  },
  subRight: {
    flex: 1
  }
})
