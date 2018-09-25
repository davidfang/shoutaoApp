import React, { Component } from 'react'
import { TouchableOpacity,View,Image, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ThirdLoginStyle'
import {Images} from "../Themes";
import ShareActions from "../Redux/ShareRedux";
import UMShare from "../Lib/UMShareUtil";

class ThirdLogin extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  _thirdLogin = (id) => {
    UMShare.auth(id,(code,result,message) =>{
      this.setState({result:message});
      console.warn(code,result,message)
      if (code == 0){
        this.setState({result:result.uid});
        this.props.thirdLogin(result.uid, id, result.screen_name, result.iconurl, result.accessToken, result.refreshToken, result.gender, result.unionid, result.openid, result.expires_in,JSON.stringify(result))
      }
    });
  }
  render () {
    return (
      <TouchableOpacity style={styles.thirdLoginGroup} onPress = {() => this._thirdLogin(2)}>
        <View style={styles.thirdLogin}>
          <Image  source={Images.wxLogo} style={styles.thirdLogo} />
          <Text style={styles.thirdText}>微信登录</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.share.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    thirdLogin: (uid, platform, screen_name, iconurl, accessToken, refreshToken, gender, unionid, openid, expires_in,other) => dispatch(ShareActions.shareLoginRequest({uid, platform, screen_name, iconurl, accessToken, refreshToken, gender, unionid, openid, expires_in,other}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdLogin)
