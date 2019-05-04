import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
 } from "react-native";
import NaviBar from '../../components/navi-bar'
import ToolBar from '../../components/tool-bar'
import Canvas from '../../components/Canvas'
import { inject, observer } from 'mobx-react'


@inject('rootStore')
@observer
export default class Page1 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
} 
 
  render() {
    return (

      <View style={{flex: 1,backgroundColor:'#f3f3f3'}}>
        <NaviBar title={'編輯故事'}/>
          <Canvas />
          <ToolBar />
      </View>
      
    )
  }

}

