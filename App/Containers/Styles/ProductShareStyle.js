import {StyleSheet} from 'react-native'
import {Colors, Metrics, ApplicationStyles, ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  commissionGroup: {
    backgroundColor: Colors.orange,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: Metrics.smallMargin
  },
  commissionText: {
    fontSize: ScreenUtil.scaleSize(10),
    color: Colors.white
  },
  titleText: {
    fontSize: ScreenUtil.scaleSize(12),
    color: Colors.black
  },
  priceText: {
    fontSize: ScreenUtil.scaleSize(10),
    color: Colors.gray
  },
  textGroup: {
    padding: Metrics.baseMargin,
    borderBottomWidth: ScreenUtil.scaleSize(.5),
    borderBottomColor: Colors.gray
  },
  imageGroup: {
    paddingVertical: Metrics.baseMargin,
    height: ScreenUtil.scaleSize(380),
    width: Metrics.screenWidth - ScreenUtil.scaleSize(20),
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  shareMainPic: {
    width: 140,
    height: 320,
    margin: Metrics.smallMargin
  },
  smallPic: {
    width: 90,
    height: 100,
    margin: Metrics.smallMargin
  },

  viewWrap: {
    //marginTop: ScreenUtil.scaleHeight(10),
    marginHorizontal: ScreenUtil.scaleSize(20),
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: Colors.steel,
    borderTopWidth: ScreenUtil.scaleSize(.5),
    paddingTop: Metrics.smallMargin
  },
  button: {
    height: ScreenUtil.scaleHeight(26),
    flex: 1,
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
  },
  mainCheckIcon: {
    left: ScreenUtil.scaleSize(120),
  },
  checkIcon: {
    left: ScreenUtil.scaleSize(70),
    top: ScreenUtil.scaleHeight(25),
    zIndex: 10
  },
  modalBackground: {
    // display:'flex',
    // flex:1,
    // position: 'absolute',
    // width: 350,
    // height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    //top: 100,
    //left: 50,
    backgroundColor:Colors.white,
    borderRadius:ScreenUtil.scaleSize(5),
    width:Metrics.screenWidth / 3 * 2,
    height: Metrics.screenWidth / 3
  },
  modalContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    //opacity:.9,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width:Metrics.screenWidth ,
    height: Metrics.screenHeight
  },
  modalButton:{
    flex:1,
    borderTopColor:Colors.steel,
    borderTopWidth:ScreenUtil.scaleSize(1),
    alignSelf:'stretch',
    justifyContent:'center',
    alignItems:'center',
    height:ScreenUtil.scaleSize(30)
  },
  modalButtonText:{
    color:Colors.blue,
    fontSize: ScreenUtil.setSpText(12),
  },
  modalTitleText: {
    fontSize: ScreenUtil.setSpText(12),
    alignSelf: 'center',
    marginVertical:ScreenUtil.scaleSize(10)
  },
  modalBodyText: {
    fontSize: ScreenUtil.setSpText(10),
    color: Colors.descText,
    marginBottom:ScreenUtil.scaleSize(5)
  },
})
