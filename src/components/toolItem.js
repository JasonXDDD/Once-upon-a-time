import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { observer, inject } from 'mobx-react';
import StoryItem from './story/storyItem';

@inject('rootStore')
@observer
export default class ToolItem extends Component {
  constructor(props){
    super(props);
    this.store = props.rootStore.toolStore;
    this.story = props.rootStore.storyStore;
    this.type = props.type;
  }
  
  render(){
    return (
      <View style={{marginTop: 10}}>
      {
        this.store[this.type].map(ele => {
          console.log(ele.id, ele.image);
          
          return (
            <TouchableOpacity style={styles.toolImage} key={ele.id} 
            onPress={()=>{
              this.addStoryItem(ele)
            }}>
              <Image style={{ width: 78, height: 78 }} source={ele.image}></Image>
              <Text style={{color: 'white'}}>{ele.id}</Text>
            </TouchableOpacity>
          )
        })
      }
      </View>
    )
  }

  addStoryItem(element){
    let data = {
      image: element.image,
      id: element.id,
      key: this.story.story.length
    }

    this.story.story.push((
      <StoryItem key={data.id + data.key} select={data}></StoryItem>
    ))
  }
}


const styles = StyleSheet.flatten({
  toolImage: {
    marginVertical: 10,
    alignItems: 'center'
  },
})