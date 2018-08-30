import React, {Component} from 'react'
import {View, Text, Image, TextInput, TouchableOpacity, Keyboard, ScrollView, ImageBackground} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Styles
import styles from './Styles/SearchScreenStyle'
import {Metrics, Colors, ScreenUtil} from '../Themes/'

class SearchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  _onChangeText = txt => {
    this.setState({
      keyword: txt
    })
  }

  _onSubmit = () => {
    let {navigate} = this.props.navigation
    navigate('ResultScreen', {
      keyWord: this.state.keyword
    })
    Keyboard.dismiss()
  }

  _clearInput = () => {
    this.setState({
      keyword: ''
    })
  }

  render() {
    let clearControl = null
    if (this.state.keyword && this.state.keyword.length >= 1) {
      clearControl = (
        <Icon name='close-circle-outline' size={ScreenUtil.scaleSize(18)} color={Colors.steel} style={styles.cancel}
              onPress={this._clearInput}/>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require('../Images/search_bg.png')}
        >
          <View style={styles.info}>
            <View style={styles.searchBox}>
              <Image
                style={styles.searchIcon}
                source={require('../Images/search_icon.png')}
              />
              <TextInput
                placeholder='好宝贝 等你搜'
                placeholderTextColor={Colors.steel}
                defaultValue={this.state.keyword}
                returnKeyType='search'
                style={styles.searchInput}
                underlineColorAndroid='transparent'
                onChangeText={this._onChangeText}
                onSubmitEditing={this._onSubmit}
              />
              {clearControl}
              <TouchableOpacity
                onPress={this._onSubmit}
                activeOpacity={1}
                style={styles.searchButton}
              >
                <Text>搜索</Text>
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: ScreenUtil.scaleHeight(10), color: '#fff'}}>
              百万张淘宝优惠券等你搜
            </Text>
          </View>
        </ImageBackground>
        <Image
          source={require('../Images/jiaocheng.png')}
          style={{width: Metrics.width, resizeMode: 'stretch'}}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
