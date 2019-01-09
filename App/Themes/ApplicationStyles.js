import {Platform} from 'react-native'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import ScreenUtil from './ScreenUtil'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
      padding: Metrics.smallMargin
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: (Platform.OS === 'ios') ? Metrics.doubleBaseMargin : 0,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: ScreenUtil.setSpText(14),
      color: Colors.text
    },
    normal: {
      ...Fonts.style.normal
    },
    separator: {
      width: Metrics.screenWidth,
      height: ScreenUtil.scaleHeight(7),
      backgroundColor: Colors.cloud
    },
    buttonText: {
      fontSize: ScreenUtil.setSpText(18),
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: ScreenUtil.scaleHeight(36),
      flex: 1,
      backgroundColor: Colors.button,
      borderColor: Colors.button,
      borderRadius: ScreenUtil.scaleSize(15),
      marginBottom: ScreenUtil.scaleHeight(10),
      marginHorizontal: ScreenUtil.scaleSize(20),
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    // 间隔线
    underline: {
      width: Metrics.screenWidth,
      height: ScreenUtil.scaleHeight(0.5),
      backgroundColor: '#E6E6E6'
    },
    description: {
      fontSize: Fonts.size.small,
      fontFamily: Fonts.type.base,
      color: Colors.descText
    },
    row: {
      flexDirection: 'row',
      width: Metrics.screenWidth,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    loginCancel: {
      alignSelf:'flex-end',
      padding: ScreenUtil.scaleSize(10)
    }
  },
  form: {
    form: {
      alignItems: 'center',
      paddingHorizontal: Metrics.marginHorizontal,
      backgroundColor: Colors.white
    },
    formHead: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: ScreenUtil.scaleHeight(15)
    },
    formHeadText: {
      color: Colors.black,
      alignSelf: 'center',
      marginRight: ScreenUtil.scaleSize(10),
      fontSize: Fonts.size.regular
    },
    formRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: ScreenUtil.scaleHeight(15),
      borderBottomWidth: Metrics.horizontalLineHeight,
      borderBottomColor: Colors.border
    },
    formRowLabel: {
      color: '#646464',
      marginRight: ScreenUtil.scaleSize(10),
      fontSize: ScreenUtil.setSpText(14)
    },
    formTextInput: {
      flex: 1,
      marginHorizontal: ScreenUtil.scaleSize(10),
      fontSize: ScreenUtil.setSpText(10),
      //backgroundColor: Colors.textInput,
      padding: 0
    },
    formTextArea: {
      flex: 1,
      marginHorizontal: ScreenUtil.scaleSize(10),
      fontSize: ScreenUtil.setSpText(10),
      height: ScreenUtil.scaleHeight(100),
      borderBottomColor: Colors.steel,
      borderBottomWidth: ScreenUtil.scaleHeight(1),
      borderLeftColor: Colors.steel,
      borderLeftWidth: ScreenUtil.scaleSize(1),
      //backgroundColor: Colors.textInput
    },
    formButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Metrics.doubleBaseMargin,
      width: Metrics.screenWidth - ScreenUtil.scaleSize(20),
      paddingVertical: Metrics.marginHorizontal,
      backgroundColor: Colors.button,
      marginTop: Metrics.doubleBaseMargin
    },
    formButtonText: {
      color: Colors.white,
      fontSize: ScreenUtil.setSpText(17)
    },
    formButtonGroup: {
      marginTop: ScreenUtil.scaleHeight(40),
      marginHorizontal: ScreenUtil.scaleSize(10)
    },
    thirdLoginGroup: {
      width: Metrics.screenWidth,
      borderTopColor: '#E6E6E6',
      borderTopWidth: ScreenUtil.scaleHeight(0.5),
      justifyContent: 'center',
      marginTop: Metrics.doubleBaseMargin * 5
    },
    thirdLogin: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    thirdLogo: {
      alignSelf: 'center',
      resizeMode: 'contain',
      width: ScreenUtil.scaleHeight(35),
      height: ScreenUtil.scaleHeight(35),
    },
    thirdText: {
      fontSize: ScreenUtil.setSpText(11),
      color: Colors.steel,
      marginVertical: Metrics.smallMargin
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: ScreenUtil.scaleHeight(1),
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
