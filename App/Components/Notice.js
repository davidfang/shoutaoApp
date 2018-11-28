import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {View, Text, Animated, Easing} from 'react-native'
import styles from './Styles/NoticeStyle'

export default class Notice extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  state = {
    //fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
    translateAnim: new Animated.Value(0),  // 透明度初始值设为0
    animation: null,
    translateY: 0
  }

  startAnimation = () => {

    Animated.sequence([
      Animated.timing(                  // 随时间变化而执行动画
        // this.state.fadeAnim,            // 动画中的变量值
        this.state.translateAnim,            // 动画中的变量值
        {
          toValue: -this.state.translateY,                   // 透明度最终变为1，即完全不透明
          duration: 8000,              // 让动画持续一段时间
          useNativeDriver: true,
          easing: Easing.linear,
          isInteraction: false
        }
      )
    ]).start(() => {
      this.setState({translateAnim: new Animated.Value(0)}, () => this.startAnimation())
    });                        // 开始执行动画

  }

  componentDidMount() {
    this.startAnimation()
  }

  _noticeBarViewOnLayout = (e) => {
    this.setState({translateY: e.nativeEvent.layout.height})
    console.log(e.nativeEvent.layout.height)
  }

  render() {
    // let {fadeAnim} = this.state;
    let {translateAnim} = this.state;
    //
    return (
      <View style={styles.container}>
        <View style={[{flexDirection: 'row', overflow: 'hidden'}]}>
          <Animated.View                 // 使用专门的可动画化的View组件
            style={{
              overflow: 'visible',
              //opacity: fadeAnim,         // 将透明度指定为动画变量值
              transform: [{translateY: translateAnim}],
            }}
            onLayout={(event) => this._noticeBarViewOnLayout(event)}
          >
            {this.props.children}
          </Animated.View>
        </View>
      </View>
    );
  }
}
