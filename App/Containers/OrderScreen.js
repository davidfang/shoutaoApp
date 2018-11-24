import React, {Component} from 'react'
import {View, Text} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import OrderActions from '../Redux/OrderRedux'
import Order from './Order'

// Styles
import styles from './Styles/OrderScreenStyle'
import {Colors} from "../Themes";

class OrderScreen extends Component {
  componentWillMount() {
    let {fetching, getOrder, status, pageNo, data} = this.props
    if (data.length < 1) {
      getOrder(1, pageNo[1])
    }
  }

  /**
   * 上拉加载 TODO
   */
  _onLoading = (status) => {
    let {getOrder, pageNo, fetching, more} = this.props
    if (!fetching && more[status]) {
      getOrder(status, pageNo[status])
    }
  }
  /**
   * 下拉刷新 TODO
   */
  _onRefreshing = (status) => {
    let {getOrder, fetching} = this.props
    if (!fetching) {
      getOrder(status, 1)
    }
  }

  render() {
    let {fetching, pageNo, more, data} = this.props
    return (
      <View style={styles.container}>
        <ScrollableTabView style={styles.scrollableTab}
                           tabBarBackgroundColor={Colors.silver}
                           tabBarActiveTextColor={Colors.fire}
                           tabBarInactiveTextColor={Colors.black}

                           renderTabBar={() => <ScrollableTabBar/>}
        >
          <Order tabLabel='全部' status={1} fetching={fetching} pageNo={pageNo[1]} more={more[1]} data={data}
                 getOrder={this.props.getOrder} onLoading={this._onLoading} onRefreshing={this._onRefreshing} />
          <Order tabLabel='已付款' status={12} fetching={fetching} pageNo={pageNo[1]} more={more[1]} data={data}
                 getOrder={this.props.getOrder} onLoading={this._onLoading} onRefreshing={this._onRefreshing} />
          <Order tabLabel='已结算' status={3} fetching={fetching} pageNo={pageNo[1]} more={more[1]} data={data}
                 getOrder={this.props.getOrder} onLoading={this._onLoading} onRefreshing={this._onRefreshing} />
          <Order tabLabel='已失效' status={13} fetching={fetching} pageNo={pageNo[1]} more={more[1]} data={data}
                 getOrder={this.props.getOrder} onLoading={this._onLoading} onRefreshing={this._onRefreshing} />
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {fetching, status, pageNo, more, data} = state.order
  return {
    fetching, status, pageNo, more, data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (status, page) => dispatch(OrderActions.orderRequest(status, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
