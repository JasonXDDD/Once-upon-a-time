import React, { Component } from 'react'
import { View, Text } from 'react-native'
import NaviBar from '../../components/navi-bar'
import ToolBar from '../../components/tool-bar'
export default class Page1 extends Component {


  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar title={'編輯故事'}/>
          <ToolBar />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>編輯故事</Text>
        </View>
      </View>
    )
  }
}

