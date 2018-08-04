import React from 'react'
import { StackNavigator } from 'react-navigation'
import RegisterScreen from "../Containers/RegisterScreen";
import UserInfoScreen from "../Containers/UserInfoScreen";
import SetPasswordScreen from "../Containers/SetPasswordScreen";
import ChangePasswordScreen from "../Containers/ChangePasswordScreen";
import EditUserScreen from "../Containers/EditUserScreen";
import MobileLoginScreen from "../Containers/MobileLoginScreen";
import LoginScreen from "../Containers/LoginScreen";

// Manifest of possible screens
const UserNav = StackNavigator({
  MobileLoginScreen: {
    screen: MobileLoginScreen,
    navigationOptions:{
      title:'短信登录',
      header: null
    }
  },
  SetPasswordScreen: {
    screen: SetPasswordScreen,
    navigationOptions:{
      title:'设置密码',
      header:null
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
        title: '登录',
        header: null
      }
    }
  },
  UserInfoScreen: {
    screen: UserInfoScreen,
    navigationOptions:{
      title:'我的',
      header: null
    }
  }
}, {
  // Default config for all screens
  headerMode: 'screen',
  mode: 'card',
  initialRouteName: 'UserInfoScreen',
  // navigationOptions: ({navigation}) => {
  //   let {goBack, navigate} = navigation
  //   return {
  //     headerStyle: styles.header,
  //     headerTitleStyle: styles.headerTitleStyle,
  //     headerLeft: <Icon name='chevron-left' onPress={() => {goBack()}} size={24} color='#fff'
  //                       style={{marginLeft: 20}}/>,
  //     headerRight: <Icon name='home' onPress={() => {navigate('MainStack')}} size={24} color='#fff'
  //                        style={{marginRight: 20}}/>,
  //   }
  // }
})

export default UserNav
