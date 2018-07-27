import React, {PureComponent} from 'react'
import {TabNavigator, TabBarBottom} from 'react-navigation'

import {View, Image} from 'react-native'

import styles from './Styles/NavigationStyles'
import {Colors} from '../Themes'

import SearchScreen from '../Containers/SearchScreen'
import ClassifyScreen from '../Containers/ClassifyScreen'
import HomeScreen from '../Containers/HomeScreen'
import CircleScreen from '../Containers/CircleScreen'
import UserInfoScreen from '../Containers/UserInfoScreen'

import SearchBar from '../Components/SearchBar'


const TabNav = TabNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: '首页',
        header: (
          <SearchBar
            showLogo={true}
            onSubmit={key => {
              navigate('result', {
                keyWord: key
              })
            }}
          />
        ),
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_home.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    classify: {
      screen: ClassifyScreen,
      navigationOptions: {
        tabBarLabel: '分类',
        title: '优惠券分类',
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_classify.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarLabel: '超级搜',
        title: '超级搜',
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_search.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    circle: {
      screen: CircleScreen,
      navigationOptions: {
        tabBarLabel: '圈子',
        title: '圈子',
        initialRouteParams: {
          id: 1
        },
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_quanzi.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    userInfo: {
      screen: UserInfoScreen,
      navigationOptions: {
        tabBarLabel: '我的',
        title: '我的',
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_user.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'home',
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: Colors.selected,
      inactiveTintColor: Colors.charcoal
    }
  }
)


export default TabNav
