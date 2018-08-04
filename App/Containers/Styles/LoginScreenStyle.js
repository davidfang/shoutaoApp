import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics} from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  container: {
    paddingTop: 70,
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
    padding: 6
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
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    display:'flex',
    flexDirection:'row'
  },
  button: {
    height: 26,
    flex:1,
    backgroundColor: Colors.button,
    borderColor: Colors.button,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
})

