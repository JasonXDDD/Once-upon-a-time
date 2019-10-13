import React, { Component } from 'react'
import { ScrollView, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react'
import StoryItem from './story/storyItem'
import * as Animatable from 'react-native-animatable';

@inject('rootStore')
@observer
export default class ToolItem extends Component {
  itemPlayer;
  // times of add item, be unique and only one for the item's key
  count = 0;
  musicCount = 0;
  
  constructor(props) {
    super(props)
    this.toolStore = props.rootStore.toolStore
    this.storyStore = props.rootStore.storyStore
    this.soundStore = props.rootStore.soundStore
    this.type = props.type
  }

  componentDidMount(){
    this.itemPlayer = this.soundStore.genMusic('tool_item')
    if(this.type === 'music'){
      this.toolStore[this.type].forEach(element => {
        element.player = this.soundStore.genMusicBySound(element.sound)
      });
    }
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 10, marginBottom: 60 }}>
        {this.toolStore[this.type].map(ele => {
          
          return (
            <TouchableOpacity
              style={styles.toolImage}
              key={ele.id}
              onLongPress={() => {
                if(this.type === 'music')
                  this.addMuusicItem(ele, this.type)
              }}
              
              onPress={() => {
                this.toolStore[this.type].map(ele => ele.isAnimate = false)
                ele.isAnimate = true
                
                setTimeout(() => {
                  if(this.type === 'music'){
                    // is music
                    if(this.soundStore.isBgm){
                      this.soundStore.bgmPlayer.stop()
                      this.soundStore.isBgm = false
                    }
                    this.soundStore.playSoundEffect(ele.player, 0.8, 0)
                  }
                  else {
                    this.soundStore.playSoundEffect(this.itemPlayer, 3, 0)
                    // is image
                    if(this.props.select === 'edit')
                      this.addStoryItem(ele, this.type)
                    else if(this.props.select === 'draw')
                      this.addDrawItem(ele)
                  }
                  
                }, 200)
                
              }}>
              <Animatable.Image 
                animation={ele.isAnimate? (this.type === 'music'? 'swing': "bounceOutRight"): ""}
                duration={this.type === 'music'? 500: 1000}
                iterationCount={this.type === 'music'? 'infinite': 1}
                onAnimationEnd={() => {
                  ele.isAnimate = false
                }}
                style={{ width: 100, height: 100 }} 
                source={ele.animate? ele.animate: JSON.parse(ele.image)} />
              
                <Text style={{ marginTop: 5, color: this.type === 'character'? 'black': 'white' }}>{ele.id}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }

  addDrawItem(element){
    if(element.isLock) {
      this.unlockMessage()
      return
    }

    let data = {
      image: element.image,
      name: element.id,
    }

    this.toolStore.drawItem = data;
  }

  addMuusicItem(element, type){
    let data = {
      image: element.image,
      sound: element.sound,
      category: type,
      name: element.id,
      key: element.id + this.musicCount,
    }

    this.musicCount ++;

    if(element.isLock) {
      this.unlockMessage()
      return
    }

    this.storyStore.storyScene[this.storyStore.selectSceneIndex].music.push(data)
  }

  addStoryItem(element, type) {
    let data = {
      image: element.image,
      animate: element.animate,
      category: type,
      name: element.id,
      key: element.id + this.count,
      style: "{}",
      sound: element.sound
    }

    this.count ++;

    if(element.isLock) {
      this.unlockMessage()
      return
    }

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

  unlockMessage(){
    Alert.alert(
      '是否要付費解鎖',
      '',
      [
        {
          text: '確定',
          onPress: () => {
          }
        },
        {
          text: '取消',
          onPress: () => {
          }
        }
      ],
      { cancelable: false }
    )
  }
  
}

const styles = StyleSheet.create({
  toolImage: {
    marginVertical: 10,
    alignItems: 'center',
  },
})
