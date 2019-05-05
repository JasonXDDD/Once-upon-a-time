import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Animated
 } from "react-native";
import NaviBar from '../../components/navi-bar'
import ToolBar from '../../components/ToolBar'
import { inject, observer } from 'mobx-react'
import Canvas from './../../components/Canvas'

@inject('rootStore')
@observer
export default class Page1 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
    this.state = {
      parentCopy : []
    }
} 

setCopy(copy) {
  this.setState({
    parentCopy: copy
  })
}




  render() {
    return (

      <View style={{flex: 1,backgroundColor:'#f3f3f3'}}>
        <NaviBar title={'編輯故事'}/>
        <ToolBar setCopy={(copy) => this.setCopy(copy)} />
        <View style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          bottom: 50,
          right: this.store.rightDirection,
          backgroundColor: "#f6f6f6",
          borderColor: "#888888",
          overflow: 'hidden',
          borderWidth: 1,
          borderRadius: 15,
        }} >
                {this.state.parentCopy}
          </View>
      </View>
      
    )
  }

}

