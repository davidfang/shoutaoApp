import React, { Component } from 'react'
import { ScrollView, Text, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Toast from '../Lib/Toast'
// Styles
import styles from './Styles/WebScreenStyle'

class WebScreen extends Component {
  constructor (props) {
    super(props)
  }
  webview: WebView
  handleMessage = (evt: any) => {
    // doSomething()
    const message = evt.nativeEvent.hasOwnProperty('data') ? JSON.parse(evt.nativeEvent.data):{}
    console.log(message)
    const {commond,payload} = message
    Toast.show('dddddddd')
    //eval(commond)
    //eval(commond(...payload))
  }
  render () {
    const {state} = this.props.navigation

    return (
      <WebView
        style={styles.container}
        javaScriptEnabled={true}
        source={{uri: state.params.url}}
        mixedContentMode='compatibility'
        ref={webview => this.webview = webview}
        onMessage={this.handleMessage}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WebScreen)
