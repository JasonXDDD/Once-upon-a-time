import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { inject, observer } from "mobx-react"



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
        style={[styles.storyBoard, {right: this.getRight(), bottom: this.getBottom() }]}>
        
        {this.store.story}
      </View>
    )
  }

  getRight(){
    if(this.toolbar.open !== '') return -110
    else {
      if(this.store.isRecord) return (width/2) - (900/2)
      else return 25
    }
  }

  getBottom(){
    if(this.store.isRecord) return (height/2) - (650/2)
    else return 25
  }
}


const styles = StyleSheet.flatten({
  storyBoard: {
    position: 'absolute',
    width: 900,
    height: 650,
    backgroundColor: '#f6f6f6',
    borderColor: '#bebebe',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  }
})
