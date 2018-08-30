import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics,ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  container: {
    paddingTop: ScreenUtil.scaleHeight(70),
    // marginTop: Metrics.doubleBaseMargin,
    height: Metrics.screenHeight,
    backgroundColor: Colors.white
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: ScreenUtil.scaleSize(6)
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth
  },
  viewWrap: {
    marginTop: ScreenUtil.scaleHeight(10),
    marginHorizontal: ScreenUtil.scaleSize(20),
    display:'flex',
    flexDirection:'row'
  },
  button: {
    height: ScreenUtil.scaleHeight(26),
    flex:1,
    backgroundColor: Colors.button,
    borderColor: Colors.button,
    borderRadius: ScreenUtil.scaleSize(8),
    marginBottom: ScreenUtil.scaleHeight(10),
    marginHorizontal: ScreenUtil.scaleSize(10),
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: ScreenUtil.setSpText(14),
    color: 'white',
    alignSelf: 'center'
  }
})

