import {StyleSheet} from 'react-native'
import {Fonts, Colors, ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  button: {
    //marginVertical: 5,
    // borderTopColor: Colors.fire,
    // borderBottomColor: Colors.bloodOrange,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: Colors.ember,
    marginHorizontal: ScreenUtil.scaleSize(5),
    borderRadius: ScreenUtil.scaleSize(5),
  },
  buttonText: {
    //margin: 10,
    textAlign: 'center',
    color: Colors.snow,
    fontSize: ScreenUtil.setSpText(12),
    fontFamily: Fonts.type.bold
  }
})
