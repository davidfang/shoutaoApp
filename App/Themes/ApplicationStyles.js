import {Platform} from 'react-native'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
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
      fontSize: 14,
      color: Colors.text
    },
    normal: {
      ...Fonts.style.normal
    },
    separator: {
      width: Metrics.screenWidth,
      height: 7,
      backgroundColor: Colors.cloud
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 36,
      flex: 1,
      backgroundColor: Colors.button,
      borderColor: Colors.button,
      borderRadius: 15,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    // 间隔线
    underline: {
      width: Metrics.screenWidth,
      height: 0.5,
      backgroundColor: '#E6E6E6'
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
      paddingVertical: 15
    },
    formHeadText:{
      color: Colors.black,
      alignSelf:'center',
      marginRight: 10,
      fontSize: Fonts.size.regular
    },
    formRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: Metrics.horizontalLineHeight,
      borderBottomColor: Colors.border
    },
    formRowLabel: {
      color: '#646464',
      marginRight: 10,
      fontSize: 15
    },
    formTextInput: {
      flex: 1,
      marginHorizontal: 10,
      fontSize: 14
    },
    formTextArea: {
      flex: 1,
      marginHorizontal: 10,
      fontSize: 14,
      height: 100,
      borderBottomColor: Colors.steel,
      borderBottomWidth: 1,
      borderLeftColor: Colors.steel,
      borderLeftWidth: 1
    },
    formButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Metrics.doubleBaseMargin,
      width: Metrics.screenWidth - 20,
      paddingVertical: Metrics.marginHorizontal,
      backgroundColor: Colors.button,
      marginTop: Metrics.doubleBaseMargin
    },
    formButtonText: {
      color: Colors.white,
      fontSize: 17
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
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
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
