import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    //height: Metrics.screenHeight * 0.25

  },
  selected: {
    color: Colors.selected
  },
  selectedItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.selected
  },
  body: {
    //flex: 1,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.steel,
    backgroundColor: Colors.silver
  },
  item: {
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  child: {
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Metrics.screenWidth * 0.25
  },
  childText: {
    color: Colors.charcoal
  },
  childs: {
    //height: Metrics.screenHeight * 0.18,
    //borderBottomWidth: 1,
    //borderBottomColor: Colors.steel,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  childImage: {
    width: 35,
    height: 35
  }

})
