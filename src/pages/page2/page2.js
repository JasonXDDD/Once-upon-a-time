import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Animated,
  TouchableHighlight
 } from "react-native";
import NaviBar from '../../components/navi-bar'
import ToolBar from '../../components/ToolBar'
import { inject, observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

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
        <NaviBar title={'畫故事'}/>
      </View>
    )
  }
}


