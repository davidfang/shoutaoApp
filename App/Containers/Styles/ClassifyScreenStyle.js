import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics,Colors,Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  /*container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 135
  },*/
  classify: {
    borderTopColor:Colors.border,
    borderTopWidth:1,
    flex: Metrics.height,
    flexDirection: 'row',
    position: 'relative'
  },
  classifyItem: {
    width: Metrics.width / 2 - 15,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border
  },

  leftList: {
    width: 1 * Metrics.screenWidth / 4,
    backgroundColor: Colors.disabledBackGround
  },
  lItem: {
    minHeight: 44,
    justifyContent: 'center'
  },
  lText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: Fonts.size.medium
  },
  rightList: {
    width: 3 * Metrics.screenWidth / 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor:Colors.white
  },
  rItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rHeader: {
    height: 30,
    width: Metrics.screenWidth * 3 / 4,
    //backgroundColor: Colors.windowTint,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 55,
    width: 55,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8
  },
  categoryText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    color:Colors.windowTint
  }
})
