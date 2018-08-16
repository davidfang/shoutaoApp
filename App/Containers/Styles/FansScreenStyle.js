import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics, Colors} from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollableTab: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.ricePaper,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.coal,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.charcoal,
    flex: 2
  },
  avatarLabel:{
    flex: 1,
    alignItems:'center'
  },
  avatar: {
    width: 46,
    height: 46
  },
  listHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.steel,
    justifyContent: 'space-around',
    paddingVertical: Metrics.smallMargin
  },
  listHeaderLabel: {
    textAlign: 'center',
    color: Colors.black
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
