import React from 'react'
import {View, Text, FlatList,Image} from 'react-native'
import {connect} from 'react-redux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import UserInfoActions from '../Redux/UserInfoRedux'

import FansList from './FansList'
// Styles
import styles from './Styles/FansScreenStyle'
import {Colors} from "../Themes";

class FansScreen extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
    }
  }
  loadFans = (refresh = false) => {
    if(refresh && !this.props.fetching){//下拉刷新
      this.props.getFans(1);
    }else {
      if (this.props.fansMore && !this.props.fetching) {
        this.props.getFans(this.props.fansNextPage);
      }
    }
  }
  loadGrandFans = (refresh = false) => {
    if(refresh  && !this.props.fetching){//下拉刷新
      this.props.getGrandFans(1);
    }else {
      if (this.props.grandFansMore && !this.props.fetching) {
        this.props.getGrandFans(this.props.grandFansNextPage);
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView style={styles.scrollableTab}
                           tabBarBackgroundColor={Colors.silver}
                           tabBarActiveTextColor={Colors.fire}
                           tabBarInactiveTextColor={Colors.black}

                           renderTabBar={() => <ScrollableTabBar/>}
        >
          <FansList tabLabel='直属粉丝' load={this.loadFans} data={this.props.fans} />
          <FansList tabLabel='推荐粉丝' load={this.loadGrandFans} data={this.props.grandFans}/>
        </ScrollableTabView>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    fetching:state.userInfo.fetching,
    fansMore:state.userInfo.fansMore,
    fans:state.userInfo.fans,
    fansNextPage:state.userInfo.fansNextPage,
    grandFansMore:state.userInfo.grandFansMore,
    grandFans:state.userInfo.grandFans,
    grandFansNextPage:state.userInfo.grandFansNextPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFans:(page)=>dispatch(UserInfoActions.fansRequest(page)),
    getGrandFans:(page)=>dispatch(UserInfoActions.grandFansRequest(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FansScreen)
