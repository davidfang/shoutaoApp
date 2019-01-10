import React from 'react'
import {View, Text, FlatList, RefreshControl, Image} from 'react-native'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import Empty from '../Components/Empty'
// Styles
import styles from './Styles/OrderStyle'
import {Images} from "../Themes";

export default class Order extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
  state = {}

  componentWillMount() {
    let {getOrder, status, data} = this.props
    if (data.length < 1) {
      getOrder(status, 1)
    }
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
    //订单状态
    let renderStatus
    switch (item.tk_status) {
      case '12':
        renderStatus = <View style={styles.buttonBlue}><Text style={styles.buttonText}>已付款</Text></View>
        break
      case '3':
        renderStatus = <View style={styles.buttonGreen}><Text style={styles.buttonText}>已结算</Text></View>
        break
      case '13':
        renderStatus = <View style={styles.buttonGray}><Text style={styles.buttonText}>已失效</Text></View>
        break
      default:
        renderStatus = <View style={styles.buttonGray}><Text style={styles.buttonText}>没命中</Text></View>
        break
    }

    return (

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Image style={styles.image} source={{uri:item.pic}} resizeMode='contain'
                 resizeMethod='resize' loadingIndicatorSource={Images.load} defaultSource={Images.default}/>
          <View style={{marginLeft:3}}>
          <View style={styles.rowItem}>
          <Text style={styles.productTitle} numberOfLines={2}>{item.item_title}</Text>
          {renderStatus}
          </View>
          <View style={styles.rowItem}>
            <View style={styles.priceGroup}><Text style={styles.priceLabel}>付款金额</Text><Text
              style={styles.price}>{item.alipay_total_price}</Text></View>
            <View style={styles.priceGroup}><Text style={styles.priceLabel}>预估佣金</Text><Text
              style={styles.price}>{item.pub_share_pre_fee}</Text></View>
          </View>
          </View>
        </View>



        <View style={styles.rowItem}><Text
          style={styles.time}>{item.create_time}创建</Text><Text style={styles.time}>{item.adzone_id == item.self_pid ? '自购返利' : '粉丝贡献'}</Text></View>
      </View>
    )
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
    <Text style={[styles.label, styles.sectionHeader]}> - 我们是有底线的 - </Text>

// Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>


// The default function if no Key is provided is index
// an identifiable key is important if you plan on
// item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => item.trade_id.toString()

// How many items should be kept im memory as we scroll?
  oneScreensWorth = 1

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

  render() {
    const {status, onLoading, onRefreshing} = this.props
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.data.filter(data => status == 1 || data.tk_status == status)}
          renderItem={this.renderRow}
          numColumns={1}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          //ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={<Empty/>}
          //ItemSeparatorComponent={this.renderSeparator}
          extraData={this.props.data}
          onEndReachedThreshold={0.1}
          onEndReached={() => onLoading(status)}
          refreshControl={
            <RefreshControl
              onRefresh={() => onRefreshing(status)}
              refreshing={this.props.fetching}
              title={this.props.fetching ? '刷新数据中' : '松开立即更新'}
            />
          }
        />
      </View>
    )
  }
}
