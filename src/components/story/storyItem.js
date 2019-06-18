import React, { Component } from 'react'
import {
  TouchableHighlight,
  Image,
  Alert,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import Gestures from 'react-native-easy-gestures'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const BOARD_WIDTH = screenWidth * 0.9
const BOARD_HEIGHT = screenHeight * 0.8

@inject('rootStore')
@observer
export default class StoryItem extends React.Component {
  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
    this.item = props.select
  }

  selectImage(item) {
    Alert.alert(
      '確定要刪除圖片嗎？',
      item.name,
      [
        {
          text: '確定',
          onPress: () => {
            this.storyStore.removeItem(item.key)
          },
        },
        {
          text: '取消',
          onPress: () => console.log('取消'),
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    if (this.item.ref != {})
      return (
        <Gestures
          draggable={this.item.category != 'scene' ? true : false}
          rotatable={this.item.category != 'scene' ? true : false}
          scalable={this.item.category != 'scene' ? true : false}
          style={{ position: 'absolute' }}
          onEnd={(event, styles) => {
            this.item.ref = styles
          }}
        >
          <TouchableHighlight
            onLongPress={() => {
              this.selectImage(this.item)
            }}
          >
            <Image
              source={this.item.image}
              style={this.item.category != 'scene' ? {} : styles.background}
            />
          </TouchableHighlight>
        </Gestures>
      )
  }
}

const styles = StyleSheet.create({
  background: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    overflow: 'hidden',
  },
})
