import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react'
import StoryItem from './story/storyItem'

@inject('rootStore')
@observer
export default class ToolItem extends Component {
  // times of add item, be unique and only one for the item's key
  count = 0;
  
  constructor(props) {
    super(props)
    this.toolStore = props.rootStore.toolStore
    this.storyStore = props.rootStore.storyStore
    this.type = props.type
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.toolStore[this.type].map(ele => {
          
          return (
            <TouchableOpacity
              style={styles.toolImage}
              key={ele.id}
              onPress={() => {
                this.addStoryItem(ele, this.type)
              }}>
              <Image style={{ width: 78, height: 78 }} source={ele.image} />
              <Text style={{ color: 'white' }}>{ele.id}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  addStoryItem(element, type) {
    let data = {
      image: element.image,
      category: type,
      name: element.id,
      key: element.id + this.count,
      style: "{}",
    }

    this.count ++;

    // deal with scene item, It must be first item (under all characters) & only one
    if (type === 'scene') {
      if (
        this.storyStore.storyScene[this.storyStore.selectSceneIndex].story.length !== 0 &&
        this.storyStore.storyScene[this.storyStore.selectSceneIndex].story[0].category === 'scene'
      )
        this.storyStore.storyScene[this.storyStore.selectSceneIndex].story[0] = data
      else this.storyStore.storyScene[this.storyStore.selectSceneIndex].story.unshift(data)
    } else this.storyStore.storyScene[this.storyStore.selectSceneIndex].story.push(data)
  }
}

const styles = StyleSheet.create({
  toolImage: {
    marginVertical: 10,
    alignItems: 'center',
  },
})
