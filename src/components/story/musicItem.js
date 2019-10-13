import React, { Component } from "react";
import {
  Image,
  Alert,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { inject, observer } from "mobx-react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;

@inject("rootStore")
@observer
export default class MusicItem extends React.Component {
  initStyle;
  initPlayer;

  state = {
    imageTmp: ""
  };


  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.soundStore = props.rootStore.soundStore;
    this.item = props.select;
    this.id = props.idofarray;
  }
  
  componentDidMount() {
    this.setState({imageTmp: JSON.parse(this.item.image)})    
    if(this.item.sound){
      this.initPlayer = this.soundStore.genMusicBySound(this.item.sound)
    }
  }

  deleteMusic(item) {
    Alert.alert(
      "確定要刪除音樂嗎？",
      item.name,
      [
        {
          text: "確定",
          onPress: () => {
            this.storyStore.removeMusicItem(item.key);
          }
        },
        {
          text: "取消",
          onPress: () => console.log("取消")
        }
      ],
      { cancelable: false }
    );
  }
  
  render() {
    return (
      <TouchableOpacity style={{
        marginHorizontal: 5, 
        marginBottom: 3,
        marginTop: this.storyStore.isRecord? (this.storyStore.selectMusic === this.item.key? 20: 40): 0
      }} 
        onLongPress={() => {
          this.deleteMusic(this.item)
        }}
        onPress={() => {
          if(this.soundStore.isBgm){
            this.soundStore.bgmPlayer.stop()
            this.soundStore.isBgm = false
          }
          if(this.storyStore.isRecord){
            this.storyStore.selectMusic = this.item.key
          }
          this.soundStore.playSoundEffect(this.initPlayer, 0.5, 0)
        }}>
        <Image source={this.item.image} style={{
          width: this.storyStore.isRecord? 80: 50, 
          height: this.storyStore.isRecord? 80: 50
        }}></Image>
        <Text style={{marginTop: 5, alignSelf: 'center'}}>{this.item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  basicSize: {
    width: 200,
    height: 200
  },

  background: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    overflow: "hidden"
  }
});
