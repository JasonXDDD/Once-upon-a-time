import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react'
import StoryItem from './story/storyItem'

@inject('rootStore')
@observer
export default class ToolItem extends Component {
  count = 0;
  
  constructor(props) {
    super(props)
    this.store = props.rootStore.toolStore
    this.story = props.rootStore.storyStore
    this.type = props.type
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.store[this.type].map(ele => {
          console.log(ele.id, ele.image)

          return (
            <TouchableOpacity
              style={styles.toolImage}
              key={ele.id}
              onPress={() => {
                this.addStoryItem(ele, this.type)
              }}
            >
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
      ref: {},
    }

    this.count ++;

    if (type === 'scene') {
      if (
        this.story.story.length !== 0 &&
        this.story.story[0].category === 'scene'
      )
        this.story.story[0] = data
      else this.story.story.unshift(data)
    } else this.story.story.push(data)
  }
}

const styles = StyleSheet.flatten({
  toolImage: {
    marginVertical: 10,
    alignItems: 'center',
  },
})
