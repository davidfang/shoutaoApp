import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  intro: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth / 3,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10
  },
  top: {
    backgroundColor: Colors.steel,
    paddingBottom: 3
  },
  headbg: {
    width: Metrics.screenWidth,
    height: 230
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
    marginHorizontal: 10,
    padding: 10,
    display: 'flex',
    backgroundColor: Colors.disabledBackGround,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  incomeBottom: {
    backgroundColor: Colors.disabledBackGround,
    marginHorizontal: 10,
    padding: 10,
    display: 'flex',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  incomeBottomItem: {
    alignItems: 'center'
  },
  introLeft: {
    height: Metrics.screenWidth / 3 - 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  introRight: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
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
    borderRadius: 20,
    backgroundColor: Colors.disabledBackGround,
    paddingVertical: 2,
    paddingHorizontal: 10
  },
  memberText:{
    color:Colors.fire
  },
  copyButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.disabledBackGround,
    padding: 2,
    paddingHorizontal: 10,
    backgroundColor: Colors.selected
  },
  withdrawButton: {
    borderRadius: 20,
    backgroundColor: Colors.button,
    padding: 2,
    paddingHorizontal: 10,
    marginVertical: 15
  },
  setting: {
    height: Metrics.screenWidth / 3 - 20,
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
    width: 32,
    height: 32,
    margin: 10
  },
  title: {
    color: Colors.silver
  }
})
