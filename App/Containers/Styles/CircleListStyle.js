import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors, Fonts, ScreenUtil} from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    // backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    margin: ScreenUtil.scaleSize(10),
    padding: ScreenUtil.scaleSize(5),
    paddingVertical: ScreenUtil.scaleHeight(10),
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.smallMargin
  },
  boldLabel2: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  labelLeft: {
    flexDirection: 'row'
  },
  author: {
    justifyContent: 'center'
  },
  label: {
    textAlign: 'auto',
    color: Colors.snow
  },
  labelContent: {
    textAlign: 'auto',
    color: Colors.descText,
    ...Fonts.style.description
  },
  picGroup: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
    alignContent: 'flex-start',
    flex: 1,
    flexWrap: 'wrap'
  },
  avatar: {
    width: ScreenUtil.scaleSize(40),
    height: ScreenUtil.scaleHeight(40),
    margin: ScreenUtil.scaleSize(5)
  },
  pic: {
    width: ScreenUtil.scaleSize(140),
    height: ScreenUtil.scaleHeight(140),
    margin: ScreenUtil.scaleSize(2)
  },
  pics: {
    width: ScreenUtil.scaleSize(100),
    height: ScreenUtil.scaleHeight(100),
    margin: ScreenUtil.scaleSize(2)
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  share: {
    //alignContent: 'center',
    height: ScreenUtil.scaleHeight(18),
    borderRadius: ScreenUtil.scaleSize(10),
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: Colors.fire,
    backgroundColor: Colors.disabledBackGround,
    paddingHorizontal: Metrics.baseMargin,
    margin: Metrics.smallMargin
  },
  separator: {
    width: Metrics.screenWidth,
    height: ScreenUtil.scaleHeight(1),
    backgroundColor: Colors.border
  }
})
