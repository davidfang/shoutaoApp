import { Text, TextInput } from 'react-native'
import DebugConfig from './DebugConfig'
import AppConfig from './AppConfig'

// Allow/disallow font-scaling in app
//Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling
Text.defaultProps = Object.assign({}, Text.defaultProps, {allowFontScaling: false})
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {allowFontScaling: false})

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !DebugConfig.yellowBox
}
