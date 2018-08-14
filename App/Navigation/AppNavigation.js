import React from 'react'
import { StackNavigator } from 'react-navigation'
import FeedbackScreen from '../Containers/FeedbackScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

import MainNavigation from './MainNavigation'

import SearchScreen from '../Containers/SearchScreen'
import HomeScreen from '../Containers/HomeScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import WebScreen from '../Containers/WebScreen'
import ResultScreen from '../Containers/ResultScreen'
import DetailScreen from '../Containers/DetailScreen'
import ClassifyListScreen from '../Containers/ClassifyListScreen'
import ChannelScreen from '../Containers/ChannelScreen'

import styles from './Styles/NavigationStyles'
import SetPasswordScreen from "../Containers/SetPasswordScreen";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  FeedbackScreen: { screen: FeedbackScreen },
  HomeScreen: { screen: HomeScreen },
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
  SetPasswordScreen: {
    screen: SetPasswordScreen,
    navigationOptions:{
      title:'设置密码',
      header:null
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
