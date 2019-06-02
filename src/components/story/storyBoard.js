import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { inject, observer } from "mobx-react"
import StoryItem from './storyItem';



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
        style={[styles.storyBoard, {right: this.getRight(), top: this.getTop() }]}>
        
        {this.store.story.map(ele=>{
          return (
            <StoryItem key={ele.id + ele.key} select={ele}></StoryItem>
          )
        })}
      </View>
    )
  }

  getRight(){
    if(this.toolbar.open !== '') return -110
    else {
      if(this.store.isRecord) return (width/2) - (width * 0.9/2)
      else return 25
    }
  }

  getTop(){
    if(this.store.isRecord) return (height/2) - (height * 0.85/2)
    else return 25
  }
}

const styles = StyleSheet.flatten({
  storyBoard: {
    width: width * 0.9,
    height: height * 0.8,
    position: 'absolute',
    backgroundColor: '#f6f6f6',
    borderColor: '#bebebe',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  }
})
