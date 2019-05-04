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

@inject('rootStore')
@observer
export default class Page3 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
  }


  render() {

    return (
      <View style={{flex: 1}}>
        <NaviBar title={'Page2'}/>

      </View>
    )
  }
}

