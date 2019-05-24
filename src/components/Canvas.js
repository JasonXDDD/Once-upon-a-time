import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar} from 'react-native'
import { inject, observer } from 'mobx-react'
import Gestures from 'react-native-easy-gestures'

@inject('rootStore')
@observer
export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
} 
 


  render() {
    return (    
          <View style={styles.screen}>
                {this.store.setCopy}
          </View>

    )
  }
}

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    bottom: 50,
    right: 100,
    backgroundColor: "#f6f6f6",
    borderColor: "#888888",
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 15,
  },
 });