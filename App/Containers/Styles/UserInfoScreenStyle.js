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
    alignItems: 'flex-end'
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
    ...Fonts.style.normal
  },
  invitationCode: {
    color: Colors.text,
    ...Fonts.style.normal
  },
  memberButton: {
    borderRadius: ScreenUtil.scaleSize(20),
    backgroundColor: Colors.disabledBackGround,
    paddingVertical: ScreenUtil.scaleHeight(2),
    paddingHorizontal: ScreenUtil.scaleSize(10)
  },
  memberText: {
    color: Colors.fire
  },
  copyButton: {
    borderRadius: ScreenUtil.scaleSize(20),
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: Colors.disabledBackGround,
    padding: ScreenUtil.scaleSize(2),
    paddingHorizontal: ScreenUtil.scaleSize(10),
    backgroundColor: Colors.selected
  },
  withdrawButton: {
    borderRadius: ScreenUtil.scaleSize(20),
    backgroundColor: Colors.button,
    padding: ScreenUtil.scaleSize(2),
    paddingHorizontal: ScreenUtil.scaleSize(10),
    marginVertical: ScreenUtil.scaleHeight(15)
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
  }
})
