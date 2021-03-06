import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import CircleList from './CircleList'
// Styles
import styles from './Styles/CircleScreenStyle'
import {Colors} from '../Themes'

class CircleScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    let circles = this.props.circles
    return (
      <View style={styles.container}>
        <View style={styles.header}><Text style={styles.normal}>圈子</Text></View>
        <ScrollableTabView style={styles.scrollableTab}
                           tabBarBackgroundColor={Colors.silver}
                           tabBarActiveTextColor={Colors.fire}
                           tabBarInactiveTextColor={Colors.black}

                           renderTabBar={() => <ScrollableTabBar/>}
        >
          {circles.map((circle) => <CircleList key={circle.category} tabLabel={circle.label} category_id={circle.category}></CircleList>)}
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    circles: state.appSet.payload.hasOwnProperty('circle') ? JSON.parse(state.appSet.payload.circle) : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleScreen)
