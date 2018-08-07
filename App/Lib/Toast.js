import React from 'react'
import RootToast from 'react-native-root-toast'
import {View, Text, StyleSheet, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
const Toast = {

  toast: null,

  show: (msg) => {
    this.toast = RootToast.show(msg, {
      position: 0,
      duration: 1500
    })
  },

  showLong: (msg) => {
    this.toast = RootToast.show(msg, {
      position: 0,
      duration: 2000
    })
  },

  showSuccess: (msg, options) => {

    let toast
    if(Platform.OS === 'ios') {
      toast = RootToast.show(
        <View style={styles.container}>
          <Icon name={'check-circle'} size={50} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View>, {
          duration: 1500,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }else{
      toast = RootToast.show(
        <Text style={styles.container}>
          <Icon name={'check-circle'} size={15} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </Text>, {
          duration: 1500,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }
    setTimeout(function () {
      RootToast.hide(toast)
      typeof options === 'function' ? options && options(): null
    }, 2000)
  },

  showLongSuccess: (msg, options) => {
    let toast
    if(Platform.OS === 'ios') {
      toast = RootToast.show(
        <View style={styles.container}>
          <Icon name={'check-circle'} size={50} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View>, {
          duration: 2000,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }else {
      toast = RootToast.show(
        <Text style={styles.container}>
          <Icon name={'check-circle'} size={15} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </Text>, {
          duration: 2000,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }
    setTimeout(function () {
      RootToast.hide(toast)
      typeof options === 'function' ? options && options(): null
    }, 2500)
  },

  showWarning: (msg, options) => {
    let toast
    if(Platform.OS === 'ios') {
      toast = RootToast.show(
        <View style={styles.container}>
          <Icon name={'warning'} size={40} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View>, {
          duration: RootToast.durations.SHORT,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }else {
      toast = RootToast.show(
        <Text style={styles.container}>
          <Icon name={'warning'} size={15} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </Text>, {
          duration: RootToast.durations.SHORT,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }
    setTimeout(function () {
      RootToast.hide(toast)
    }, RootToast.durations.SHORT + 500)
  },

  showError: (msg, options) => {
    let toast
    if(Platform.OS === 'ios') {
      toast = RootToast.show(
        <View style={styles.container}>
          <Icon name={'error'} size={40} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View>, {
          duration: RootToast.durations.SHORT,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }else{
      toast = RootToast.show(
        <Text style={styles.container}>
          <Icon name={'error'} size={15} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </Text>, {
          duration: RootToast.durations.SHORT,
          position: RootToast.positions.CENTER,
          ...options,
        })
    }
    setTimeout(function () {
      RootToast.hide(toast)
    }, RootToast.durations.SHORT + 500)
  }
}

var styles = StyleSheet.create({
  container: {
    width: 140,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  }
})

export default Toast
