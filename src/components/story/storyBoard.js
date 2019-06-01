import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { inject, observer } from "mobx-react"

@inject('rootStore')
@observer
export default class StoryBoard extends Component {
  constructor(props){
    super(props);
    this.store = props.rootStore.storyStore;
    this.toolbar = props.rootStore.toolStore;
  }

  render(){
    return (   
      <View
        ref={ref => { this.store.containerView = ref }}
        style={[styles.storyBoard, {right: this.toolbar.open !== ''? -110: 25}]}>
        
        {this.store.story}
      </View>
    )
  }
}


const styles = StyleSheet.flatten({
  storyBoard: {
    position: 'absolute',
    width: 900,
    height: 650,
    bottom: 25,
    backgroundColor: '#f6f6f6',
    borderColor: '#bebebe',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  }
})
