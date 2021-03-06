import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native'
import { inject, observer } from 'mobx-react'
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";

import StoryItem from './storyItem'
import MusicItem from './musicItem'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const BOARD_WIDTH = screenWidth * 0.76
const BOARD_HEIGHT = screenHeight * 0.7
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.04
const BOARD_POS_BASIC = 25
const TOOL_PANE_WIDTH = 135

@inject('rootStore')
@observer
export default class StoryBoard extends Component {
  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
    this.toolStore = props.rootStore.toolStore
  }

  render() {
    return (
      <View style={[styles.storyBoard, { right: VAR.BOARD_RIGHT, top: VAR.BOARD_TOP }]}>
        <Image source={RES.Teaching_BG} style={[styles.background]} />

        {this.storyStore.storyScene[this.storyStore.selectSceneIndex].story.map(
          (ele, id) => {
            console.log(ele)
            return <StoryItem key={ele.key} select={ele} idofarray={id} />
          }
        )}

        <View style={[styles.musicBoard, {display: this.storyStore.isRecord? 'none': 'flex'}]}>
          {this.storyStore.storyScene[this.storyStore.selectSceneIndex].music.map(
            (ele, id) => {
              console.log(ele)
              return <MusicItem key={ele.key} select={ele} idofarray={id} />
            }
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  storyBoard: {
    width: VAR.BOARD_WIDTH,
    height: VAR.BOARD_HEIGHT,
    position: 'absolute',
    backgroundColor: '#f6f6f6',
    borderColor: '#bebebe',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  },

  background: {
    width: VAR.BOARD_WIDTH,
    height: VAR.BOARD_HEIGHT,
    overflow: 'hidden',
  },

  musicBoard: {
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row'
  }
})
