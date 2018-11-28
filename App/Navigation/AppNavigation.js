import React from 'react'
import {StackNavigator} from 'react-navigation'
import ProductShare from '../Containers/ProductShare'
import ThirdLogin from '../Containers/ThirdLogin'
import FeedbackScreen from '../Containers/FeedbackScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

import MainNavigation from './MainNavigation'

import SearchScreen from '../Containers/SearchScreen'
import HomeScreen from '../Containers/HomeScreen'
import WebScreen from '../Containers/WebScreen'
import ResultScreen from '../Containers/ResultScreen'
import DetailScreen from '../Containers/DetailScreen'
import ClassifyListScreen from '../Containers/ClassifyListScreen'
import ChannelScreen from '../Containers/ChannelScreen'

import styles from './Styles/NavigationStyles'
import SetPasswordScreen from "../Containers/SetPasswordScreen";
import {ScreenUtil} from '../Themes'
import InviteScreen from "../Containers/InviteScreen";
import LoginScreen from "../Containers/LoginScreen";
import RegisterScreen from "../Containers/RegisterScreen";
import MobileLoginScreen from "../Containers/MobileLoginScreen";
// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ProductShare: {
    screen: ProductShare,
    navigationOptions: {
      title: '分享赚钱',
      // header: null
    }
  },
  ThirdLogin: {screen: ThirdLogin},
  InviteScreen: {
    screen: InviteScreen,
    navigationOptions: {
      title: '邀请好友'
    }
  },
  FeedbackScreen: {
    screen: FeedbackScreen,
    navigationOptions: {
      title: '意见反馈'
    }
  },
  HomeScreen: {screen: HomeScreen},
  SearchScreen: {screen: SearchScreen},
  WebScreen: {
    screen: WebScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: state.params.title
      }
    }
  },
  SetPasswordScreen: {
    screen: SetPasswordScreen,
    navigationOptions: {
      title: '设置密码',
      header: null
    }
  },
  ResultScreen: {screen: ResultScreen},
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        header: null
      }
    }
  },
  ClassifyListScreen: {
    screen: ClassifyListScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: state.params.title
      }
    }
  },
  ChannelScreen: {
    screen: ChannelScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: state.params.title
      }
    }
  },
  MainStack: {
    screen: MainNavigation,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        header: null
      }
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: '登录',
        header: null
      }
    }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: '注册'
      }
    }
  },
  MobileLoginScreen: {
    screen: MobileLoginScreen,
    navigationOptions: {
      title: '短信登录',
      header: null
    }
  },
}, {
  // Default config for all screens
  headerMode: 'screen',
  mode: 'card',
  initialRouteName: 'MainStack',
  navigationOptions: ({navigation}) => {
    let {goBack, navigate} = navigation
    return {
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: <Icon name='chevron-left' onPress={() => {
        goBack()
      }} size={ScreenUtil.scaleSize(18)} color='#fff'
                        style={{marginLeft: ScreenUtil.scaleSize(10)}}/>,
      headerRight: <Icon name='home' onPress={() => {
        navigate('MainStack')
      }} size={ScreenUtil.scaleSize(18)} color='#fff'
                         style={{marginRight: ScreenUtil.scaleSize(20)}}/>,
      headerTitleAllowFontScaling: false
    }
  }
})

export default PrimaryNav
