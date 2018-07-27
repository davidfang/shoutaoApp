import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import {Colors} from "../../Themes";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  searchBar: {
    paddingTop: Metrics.doubleBaseMargin,
  },
  backIcon: {
    width: 30,
    height: 30,
    backgroundColor: Colors.windowTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    left: 25,
    top: 25,
    zIndex: 1000
  },
})
