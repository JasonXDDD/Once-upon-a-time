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
export default class Page1 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
} 





  render() {
    return (

      <View style={{flex: 1}}>
        <NaviBar title={'錄影故事'}/>

        <View 
        style={{
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
        }}>
        {this.store.save}
        </View>
      </View>
      
    )
  }

}

