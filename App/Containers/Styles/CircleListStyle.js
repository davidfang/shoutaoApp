import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors,Fonts } from '../../Themes'

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
    margin: 10,
    padding: 5,
    paddingVertical: 10,
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
  pic: {
    width: 40,
    height: 40,
    margin: 5
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  share: {
    //alignContent: 'center',
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.fire,
    backgroundColor: Colors.disabledBackGround,
    paddingHorizontal: Metrics.baseMargin,
    margin: Metrics.smallMargin
  },
  separator: {
    width: Metrics.screenWidth,
    height: 1,
    backgroundColor: Colors.border
  }
})
