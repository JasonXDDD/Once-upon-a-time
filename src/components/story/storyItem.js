import React, { Component } from 'react'
import { TouchableHighlight, Image, Alert, Text, Dimensions, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import Gestures from 'react-native-easy-gestures'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
@inject('rootStore')
@observer
export default class StoryItem extends React.Component {

  constructor(props) {
    super(props)
    this.store = props.rootStore.storyStore
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
            this.store.removeItem(item.key)
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

  /* key: item index of array, id: which item is */
  render() {
    if (this.item.ref != {})
      return (
        <Gestures
          draggable={this.item.category != 'scene' ? true: false}
          rotatable={this.item.category != 'scene' ? true: false}
          scalable={this.item.category != 'scene' ? true: false}
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
            <Image source={this.item.image} style={this.item.category != 'scene' ? {}: styles.background} />
          </TouchableHighlight>
        </Gestures>
      )
  }
}


const styles = StyleSheet.flatten({
  background: {
    width: width * 0.9,
    height: height * 0.8,
    overflow: 'hidden'
  }
})
