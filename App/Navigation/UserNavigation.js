import React from 'react'
import { StackNavigator } from 'react-navigation'
import {View, Text} from 'react-native'
import RegisterScreen from "../Containers/RegisterScreen";
import UserInfoScreen from "../Containers/UserInfoScreen";
import ChangePasswordScreen from "../Containers/ChangePasswordScreen";
import EditUserScreen from "../Containers/EditUserScreen";
import MobileLoginScreen from "../Containers/MobileLoginScreen";
import LoginScreen from "../Containers/LoginScreen";
import FansScreen from "../Containers/FansScreen";
import BindingBankCardScreen from "../Containers/BindingBankCardScreen";
import WithdrawalScreen from "../Containers/WithdrawalScreen";
import BindMobileScreen from "../Containers/BindMobileScreen";

// Manifest of possible screens
const UserNav = StackNavigator({
  MobileLoginScreen: {
    screen: MobileLoginScreen,
    navigationOptions:{
      title:'短信登录',
      header: null
    }
  },
  ChangePasswordScreen: {
    screen: ChangePasswordScreen,
    navigationOptions:{
      title:'修改密码'
    }
  },
  BindMobileScreen: {
    screen: BindMobileScreen,
    navigationOptions:{
      title:'三方登录绑定手机号'
    }
  },
  EditUserScreen: {
    screen: EditUserScreen,
    navigationOptions:{
      title:'用户信息'
    }
  },
  BindingBankCardScreen: {
    screen: BindingBankCardScreen,
    navigationOptions:{
      title:'绑定提现支付宝'
    }
  },
  WithdrawalScreen: {
    screen: WithdrawalScreen,
    navigationOptions:{
      title:'提现申请'
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
  },
  FansScreen: {
    screen: FansScreen ,
    navigationOptions:{
      title:'粉丝'
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
