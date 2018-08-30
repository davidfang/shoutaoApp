import { StyleSheet } from 'react-native'
import { Fonts, Colors,ScreenUtil } from '../../Themes/'

export default StyleSheet.create({
  button: {
    marginVertical: ScreenUtil.scaleSize(5),
    borderTopColor: Colors.fire,
    borderBottomColor: Colors.bloodOrange,
    borderTopWidth: ScreenUtil.scaleHeight(1),
    borderBottomWidth: ScreenUtil.scaleHeight(1),
    backgroundColor: Colors.ember,
    borderRadius: ScreenUtil.scaleSize(5)
  },
  buttonText: {
    margin: ScreenUtil.scaleSize(10),
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  }
})
