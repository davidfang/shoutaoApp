import {StyleSheet} from 'react-native'
import {Colors, ScreenUtil} from '../../Themes'

export default StyleSheet.create({

  item: {
    flexDirection: 'column'
  },

  container: {
    height: ScreenUtil.scaleHeight(50),
    flexDirection: 'row',
    alignItems: 'center'
  },

  img: {
    width: ScreenUtil.scaleSize(20),
    height: ScreenUtil.scaleHeight(20),
    marginLeft: ScreenUtil.scaleSize(20)
  },

  title: {
    flex: 1,
    marginLeft: ScreenUtil.scaleSize(15)
  },

  skipImg: {
    marginRight: ScreenUtil.scaleSize(20)
  },

  underline: {
    height: ScreenUtil.scaleHeight(0.5),
    backgroundColor: Colors.text,
    marginHorizontal: ScreenUtil.scaleSize(10)
  }
})
