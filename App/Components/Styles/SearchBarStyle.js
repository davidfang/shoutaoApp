import { StyleSheet } from 'react-native'
import {Metrics, Colors, ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ScreenUtil.scaleHeight(48),
    backgroundColor: Colors.white
  },
  logo: {
    height: ScreenUtil.scaleHeight(24),
    width: ScreenUtil.scaleSize(80),
    resizeMode: 'stretch' // 拉伸模式
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: ScreenUtil.scaleSize(5),
    backgroundColor: Colors.silver,
    alignItems: 'center'
  },
  searchIcon: {
    width: ScreenUtil.scaleSize(18),
    height: ScreenUtil.scaleHeight(18),
    marginHorizontal: ScreenUtil.scaleSize(10),
    resizeMode: 'stretch'
  },
  searchInput: {
    flex: 1,
    padding: 0,
    marginHorizontal: ScreenUtil.scaleSize(5),
    height: ScreenUtil.scaleHeight(32)
  },
  searchButton: {
    width: ScreenUtil.scaleSize(55),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancel: {
    width: ScreenUtil.scaleSize(21),
    height: ScreenUtil.scaleSize(21),
    alignItems: 'center',
    justifyContent: 'center'
  }
})
