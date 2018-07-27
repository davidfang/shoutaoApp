import React from 'react'
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/CircleListStyle'
import {Colors} from '../Themes'

class CircleList extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
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
            <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                   style={styles.pic}/>
            <View style={styles.author}>
              <View><Text>title</Text></View>
              <View><Text>昨天 18：00</Text></View>
            </View>
          </View>
          <TouchableOpacity style={styles.share}>
            <Icon name={'md-share'} size={15} color={Colors.fire}> 9999</Icon>
          </TouchableOpacity>
        </View>
        <Text style={styles.labelContent}>{item.description}</Text>
        <View style={styles.picGroup}>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
          <Image source={{uri: 'http://img.hb.aicdn.com/2c8550be8c300051e80fbc3ef1f5eb3c4e340dc78ce0-T0cyNw_fw86'}}
                 style={styles.pic}/>
        </View>
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
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <View style={styles.separator}> - ~~~~~ - </View>

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

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          numColumns={1}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleList)
