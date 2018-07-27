import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes/'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  /* scrollableTab  */
  scrollableTab: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  scrollableTabBarUnderlineStyle: {
    backgroundColor: Colors.fire
  }
})
