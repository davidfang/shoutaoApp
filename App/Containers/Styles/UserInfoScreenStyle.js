import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts, ScreenUtil} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  intro: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth / 3,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: ScreenUtil.scaleSize(10)
  },
  top: {
    backgroundColor: Colors.steel,
    paddingBottom: ScreenUtil.scaleSize(3)
  },
  headbg: {
    width: Metrics.screenWidth,
    height: ScreenUtil.scaleHeight(230)
  },
  head: {
    backgroundColor: Colors.background
  },
  headNoLogin: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  incomeTop: {
    marginHorizontal: ScreenUtil.scaleSize(10),
    padding: ScreenUtil.scaleSize(10),
    display: 'flex',
    backgroundColor: Colors.disabledBackGround,
    borderTopLeftRadius: ScreenUtil.scaleSize(10),
    borderTopRightRadius: ScreenUtil.scaleSize(10),
    borderBottomWidth: ScreenUtil.scaleHeight(1),
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  incomeBottom: {
    backgroundColor: Colors.disabledBackGround,
    marginHorizontal: ScreenUtil.scaleSize(10),
    padding: ScreenUtil.scaleSize(10),
    display: 'flex',
    borderBottomLeftRadius: ScreenUtil.scaleSize(10),
    borderBottomRightRadius: ScreenUtil.scaleSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  incomeBottomItem: {
    alignItems: 'center'
  },
  introLeft: {
    height: Metrics.screenWidth / 3 - ScreenUtil.scaleHeight(20),
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  introRight: {
    height: ScreenUtil.scaleHeight(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ScreenUtil.scaleSize(20),
    backgroundColor: Colors.ember
  },
  nickName: {
    color: Colors.text,
    fontSize: ScreenUtil.setSpText(14)
  },
  invitationCode: {
    color: Colors.text,
    fontSize: ScreenUtil.setSpText(14)
  },
  memberButton: {
    borderRadius: ScreenUtil.scaleSize(12),
    backgroundColor: Colors.disabledBackGround,
    paddingVertical: ScreenUtil.scaleHeight(2),
    paddingHorizontal: ScreenUtil.scaleSize(5)
  },
  memberButtonText: {
    color: Colors.fire,
    textAlign: 'center',
    fontSize: ScreenUtil.setSpText(10)
  },
  copyButton: {
    borderRadius: ScreenUtil.scaleSize(14),
    // borderWidth: ScreenUtil.scaleSize(1),
    borderColor: Colors.disabledBackGround,
    //padding: ScreenUtil.scaleSize(2),
    paddingHorizontal: ScreenUtil.scaleSize(7),
    backgroundColor: Colors.selected
  },
  withdrawButton: {
    borderRadius: ScreenUtil.scaleSize(14),
    backgroundColor: Colors.button,
    // borderWidth: ScreenUtil.scaleSize(1),
    //padding: ScreenUtil.scaleSize(2),
    paddingHorizontal: ScreenUtil.scaleSize(7),
    marginVertical: ScreenUtil.scaleHeight(12)
  },
  setting: {
    height: Metrics.screenWidth / 3 - ScreenUtil.scaleHeight(20),
    margin: 10
  },
  rowItemGroup: {
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.silver
  },
  gridItemGroup: {
    backgroundColor: Colors.silver,
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    justifyContent: 'space-around'
  },
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridIcon: {
    width: ScreenUtil.scaleSize(32),
    height: ScreenUtil.scaleHeight(32),
    margin: ScreenUtil.scaleSize(10)
  },
  title: {
    color: Colors.silver
  },
  thirdLogo: {
    alignSelf: 'center',
    //resizeMode: 'contain',
    width: ScreenUtil.scaleHeight(30),
    height: ScreenUtil.scaleHeight(30),
    marginRight: Metrics.smallMargin
  },
  thirdText: {
    fontSize: ScreenUtil.setSpText(13),
    color: Colors.green,
    marginVertical: Metrics.smallMargin
  },
  weChatButton: {
    backgroundColor: Colors.silver,
    borderRadius: ScreenUtil.scaleSize(5),
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    flexDirection: 'row'
  }
})
