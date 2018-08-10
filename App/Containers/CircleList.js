import React from 'react'
import {View, Text, FlatList, Image, TouchableOpacity,RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import CircleActions ,{CircleSelectors} from '../Redux/CircleRedux'
// Styles
import styles from './Styles/CircleListStyle'
import {Colors} from '../Themes'

class CircleList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      more: props.more
    }
  }
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {title: 'First Title', description: 'First DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription'},
      {title: 'Second Title', description: '成功的人排除万难也能成功Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'}
    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow({item}) {
    return (
      <View key={item.index} style={styles.row}>
        <View style={styles.boldLabel}>
          <View style={styles.labelLeft}>
            <Image source={{uri: item.avatar}}
                   style={styles.pic}
                   resizeMode='contain'
                   resizeMethod='resize'
            />
            <View style={styles.author}>
              <View><Text>{item.author}</Text></View>
              <View><Text>{item.created_at}</Text></View>
            </View>
          </View>
          <TouchableOpacity style={styles.share}>
            <Text><Icon name={'md-share'} size={15} color={Colors.fire}/> {item.click}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.labelContent}>{item.body}</Text>
        <View style={styles.picGroup}>
          <Image source={{uri: item.thumbnail}}
                 style={styles.pic}  resizeMode='contain'
                 resizeMethod='resize'/>
        </View>
      </View>
    )
  }
  componentWillMount () {
    let {circle,category_id} = this.props
    if(circle.length <1){
      let {page} = this.state
      this.props.getCircles(category_id,page)
      this.setState({page:page + 1})
    }
  }
  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.separator}> - ~~~~~ - </Text>

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
   * 上拉加载 TODO
   */
  _onLoading = () => {
    let {fetching,more,getCircles,category_id} = this.props
    let {page} = this.state
    if (!fetching && more) {
      getCircles(category_id,page)
      this.setState({page:page +1})
    }
  }
  /**
   * 下拉刷新 TODO
   */
  _onRefreshing = () => {
    if (!this.props.fetching) {
      this.props.getCircles(this.props.category_id,this.state.page)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.circle}
          renderItem={this.renderRow}
          numColumns={1}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
          extraData={this.props.circle}
          onEndReachedThreshold={0.3}
          onEndReached={this._onLoading}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefreshing}
              refreshing={this.props.fetching}
              title={this.props.fetching ? '刷新数据中' : '松开立即更新'}
            />
          }
        />
      </View>
    )
  }
}

const mapStateToProps = (state,props) => {
  const {category_id} = props
  let circle = CircleSelectors.getCircle(state.circle,category_id)
  let more = CircleSelectors.getMore(state.circle,category_id)

  return {
    //category_id,
    fetching:state.circle.fetching,
    circle,
    more
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCircles:(category_id,page) => dispatch(CircleActions.circleRequest(category_id,page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleList)
