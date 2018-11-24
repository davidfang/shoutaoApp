import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'
import ScreenUtil from "../../Themes/ScreenUtil";
import {Colors} from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listView: {
    flex: Metrics.height
  }
})
