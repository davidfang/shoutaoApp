import { StyleSheet } from 'react-native'
import { ApplicationStyles,Metrics } from '../../Themes/'
import ScreenUtil from '../../Themes/ScreenUtil'
import {Colors} from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  container: {
    ...ApplicationStyles.screen.container,
    paddingHorizontal: Metrics.smallMargin
  },
  image:{
    width:Metrics.screenWidth - ScreenUtil.scaleSize(50),
    height:Metrics.screenHeight *2 /3,
    margin:Metrics.doubleBaseMargin
  },
  textCenter:{
    textAlign:'center'
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
    backgroundColor: Colors.fire,
    borderColor: Colors.selected,
    borderRadius: ScreenUtil.scaleSize(8),
    marginBottom: ScreenUtil.scaleHeight(10),
    marginHorizontal: ScreenUtil.scaleSize(10),
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: ScreenUtil.setSpText(12),
    color: 'white',
    alignSelf: 'center'
  }
})
