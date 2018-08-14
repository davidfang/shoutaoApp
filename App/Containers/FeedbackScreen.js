import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, Platform} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ImagePicker from 'react-native-image-crop-picker'
import BannerActions from '../Redux/BannerRedux'

// Styles
import styles from './Styles/FeedbackScreenStyle'
import {Colors} from "../Themes";

class FeedbackScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching:false,
      body: '',
      img: '',
      fileUrl: '',
      fileName: ''
    }
  }

  selectPhotoTapped = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      //cropperCircleOverlay: true
    }).then(image => {
      console.log(image);
      let fileUrl = image.path
      let fileName = Platform.OS == 'ios' ? image.filename : fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
      this.setState({fileUrl, fileName})
      //this.props.uploadAvatar(fileUrl, fileName)
    }).catch(e => alert(e));
  }

  /**
   * 提交修改
   */
  submit() {
    if (!this.props.fetching) {
      let {body, fileUrl, fileName} = this.state
      this.props.postFeedBack(body, fileUrl, fileName)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formRow}>
          <Text style={styles.formRowLabel}>我要反馈</Text>
          <TextInput
            ref='body'
            multiline={true}
            style={styles.formTextArea}
            value={this.state.body}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.setState({body: text})}
            underlineColorAndroid='transparent'
            placeholder='请输入您的宝贵意见'
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowLabel}>上传截图</Text>
          <TouchableOpacity style={styles.setting} onPress={this.selectPhotoTapped.bind(this)}>
            <Icon name='image-plus' size={60} color={Colors.steel}/>
          </TouchableOpacity>
          <Text>{this.state.fileName}</Text>
        </View>
        <TouchableOpacity style={styles.formButton} onPress={() => this.submit()} >
          <Text style={styles.formButtonText}>提交</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    postFeedBack: (body, fileUrl, fileName) => dispatch(BannerActions.feedbackRequest(body, fileUrl, fileName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen)
