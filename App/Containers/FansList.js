import React from 'react'
import PropTypes from 'prop-types';
import {View, Text, FlatList, Image, RefreshControl} from 'react-native'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/FansListStyle'
import Empty from "../Components/Empty";

export default class FansList extends React.PureComponent {
  // // Prop type warnings
  static propTypes = {
    load: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    fetching: false,
    data: []
  }

  componentDidMount() {
    if (this.props.data.length == 0) {
      this.props.load()
    }
  }

  renderRow({item}) {
    return (
      <View style={styles.row}>
        <View style={styles.avatarLabel}>
          <Image source={{uri: item.avatar}}
                 style={styles.avatar}
          />
        </View>
        <Text style={styles.boldLabel}>{item.nickname}</Text>
        <Text style={styles.label}>{item.created_at}</Text>
      </View>
    )
  }

  // Render a header?
  renderHeader = () => {
    return (<View style={styles.listHeader}>
      <Text style={[styles.listHeaderLabel, styles.sectionHeader]}> 头像 </Text>
      <Text style={[styles.listHeaderLabel, styles.sectionHeader]}> 昵称 </Text>
      <Text style={[styles.listHeaderLabel, styles.sectionHeader]}> 时间 </Text>
    </View>)
  }

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - 我是有底线的哦 - </Text>

  // Show this when data is empty
  renderEmpty = () => <Empty/>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index.toString()

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}
  /**
   * 下拉刷新 TODO
   */
  onRefreshing = () => {
    this.props.load(true)
  }

  /**
   * 上拉加载 TODO
   */
  onLoading = () => {
    this.props.load()
  }

  render() {
    return <FlatList
      contentContainerStyle={styles.listContent}
      data={this.props.data}
      renderItem={this.renderRow}
      keyExtractor={this.keyExtractor}
      initialNumToRender={this.oneScreensWorth}
      //ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      ListEmptyComponent={this.renderEmpty}
      //ItemSeparatorComponent={this.renderSeparator}

      onEndReachedThreshold={0.3}
      onEndReached={this.onLoading}
      refreshControl={
        <RefreshControl
          onRefresh={this.onRefreshing}
          refreshing={this.props.fetching}
          title={this.props.fetching ? '刷新数据中' : '松开立即更新'}
        />
      }
    />
  }
}
