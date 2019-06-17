import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet, requireNativeComponent } from 'react-native'
import { inject, observer } from 'mobx-react'

import Btn_Recording from '../../assets/images/RecordStory/Btn_Recording.png'


const SwiftRecordTool = requireNativeComponent('RecordTool')

@inject('rootStore')
@observer
export default class RecordTool extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.storyStore
    this.navigation = props.navigation
  }

  render() {
    return (
      <SwiftRecordTool style={[styles.recordTool, {display: !this.store.isRecord? 'none': 'flex'}]}/>
    )
  }
}

const styles = StyleSheet.flatten({
  recordTool: {
    top: 10,
    width: 160,
    position: 'absolute',
    right: 0
  }
})
