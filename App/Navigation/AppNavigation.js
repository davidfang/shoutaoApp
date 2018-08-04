import React from 'react'
import { StackNavigator } from 'react-navigation'
import MobileLoginScreen from '../Containers/MobileLoginScreen'
import SetPasswordScreen from '../Containers/SetPasswordScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import EditUserScreen from '../Containers/EditUserScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import LoginScreen from '../Containers/LoginScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import CircleList from '../Containers/CircleList'

import MainNavigation from './MainNavigation'

import CircleScreen from '../Containers/CircleScreen'
import ClassifyScreen from '../Containers/ClassifyScreen'
import SearchScreen from '../Containers/SearchScreen'
import HomeScreen from '../Containers/HomeScreen'
import UserInfoScreen from '../Containers/UserInfoScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import WebScreen from '../Containers/WebScreen'
import ResultScreen from '../Containers/ResultScreen'
import DetailScreen from '../Containers/DetailScreen'
import ClassifyListScreen from '../Containers/ClassifyListScreen'
import ChannelScreen from '../Containers/ChannelScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MobileLoginScreen: {
    screen: MobileLoginScreen,
    navigationOptions:{
      title:'短信登录'
    }
  },
  SetPasswordScreen: {
    screen: SetPasswordScreen,
    navigationOptions:{
      title:'设置密码'
    }
  },
  ChangePasswordScreen: {
    screen: ChangePasswordScreen,
    navigationOptions:{
      title:'修改密码'
    }
  },
  EditUserScreen: {
    screen: EditUserScreen,
    navigationOptions:{
      title:'用户信息'
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
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: '登录'
      }
    }
  },
  HomeScreen: { screen: HomeScreen },
  UserInfoScreen: {
    screen: UserInfoScreen,
    navigationOptions:{
      title:'我的'
    }
  },
  LaunchScreen: { screen: LaunchScreen },
  SearchScreen: { screen: SearchScreen },


  WebScreen: {
    screen: WebScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: state.params.title
      }
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
      headerLeft: <Icon name='chevron-left' onPress={() => {goBack()}} size={24} color='#fff'
                        style={{marginLeft: 20}}/>,
      headerRight: <Icon name='home' onPress={() => {navigate('MainStack')}} size={24} color='#fff'
                         style={{marginRight: 20}}/>,
    }
  }
})

export default PrimaryNav
