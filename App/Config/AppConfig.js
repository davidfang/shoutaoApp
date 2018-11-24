// Simple React Native specific changes
import Config from 'react-native-config'
import { Platform} from 'react-native'
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  apiUrl: Config.API_URL,
  webUrl: Config.WEB_URL,
  appName: Config.APP_NAME,
  appVersion:  Platform.OS === 'ios' ? Config.APP_VERSION_IOS:Config.APP_VERSION_ANDROID,
  platform: Platform.OS === 'ios' ? 'ios' : 'android'
}
