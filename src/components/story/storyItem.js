import React, { Component } from 'react'
import { TouchableHighlight, Image, Alert } from 'react-native'
import { inject, observer } from "mobx-react"
import Gestures from 'react-native-easy-gestures'


@inject('rootStore')
@observer
export default class StoryItem extends React.Component {
  constructor(props){
    super(props);
    this.store = props.rootStore.storyStore;
    this.item = props.select;
  }

  selectImage(key) {
    Alert.alert(
      '確定要刪除圖片嗎？',
      ' ',
      [
        {
          text: '確定',
          onPress: () => {
            this.store.removeItem(key)
          },
        },
        { 
          text: '取消', 
          onPress: () => console.log('取消') 
        },
      ],

      { cancelable: false }
    )
  }



  /* key: item index of array, id: which item is */
  render(){

    return (
      <Gestures style={{ position: 'absolute' }}>
        <TouchableHighlight
          ref={ref => {
            this.store.innerView[this.item.key] = ref
          }}
          onLongPress={() => {
            this.selectImage(this.item.key)
          }}>
          <Image source={this.item.image} />
        </TouchableHighlight>
      </Gestures>
    )
  }
}