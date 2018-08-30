import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics,Colors,ScreenUtil } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },

  bg: {
    width: Metrics.width,
    height: ScreenUtil.scaleHeight(120),
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  searchBox: {
    height: ScreenUtil.scaleHeight(45),
    width: Metrics.width * 0.9,
    flexDirection: 'row',
    borderRadius: ScreenUtil.scaleSize(5),
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  searchIcon: {
    width: ScreenUtil.scaleSize(18),
    height: ScreenUtil.scaleSize(18),
    marginHorizontal: ScreenUtil.scaleSize(10),
    resizeMode: 'stretch'
  },
  searchInput: {
    flex: 1,
    padding: 0,
    marginHorizontal: ScreenUtil.scaleSize(5)
  },
  searchButton: {
    width: ScreenUtil.scaleSize(70),
    alignItems: 'center',
    justifyContent: 'center',
    height: ScreenUtil.scaleHeight(45),
    backgroundColor: '#ffb300',
    borderTopRightRadius: ScreenUtil.scaleSize(5),
    borderBottomRightRadius: ScreenUtil.scaleSize(5)
  },
  cancel: {
    width: ScreenUtil.scaleSize(21),
    height: ScreenUtil.scaleHeight(21),
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1
  }
})
