import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Switch,
  TextInput,
  Picker,
  Slider,
  WebView,
  ART
 } from "react-native";
import NaviBar from '../../components/navi-bar'
import { inject, observer } from 'mobx-react'
import Canvas from '../../components/Canvas'

@inject('rootStore')
@observer
export default class Page2 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
  }


  render() {

    return (
      <View style={{flex: 1}}>
        <NaviBar title={'錄影故事'}/>
        <Canvas />
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  previewImage: {
    width: 500,
    height: 500,
    position: 'absolute',
  },
  test: {
    top: '50%',
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
})