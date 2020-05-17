import React, { Component } from "react";
import { TouchableHighlight, Image, Alert, Text, Dimensions, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";
import Gestures from "react-native-easy-gestures";
import { RNCamera } from 'react-native-camera';
import { VAR } from "../../core/variable";


@inject("rootStore")
@observer
export default class StoryItem extends React.Component {
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

  deleteImage(item) {
    Alert.alert(
      "確定要刪除圖片嗎？",
      item.name,
      [
        {
          text: "確定",
          onPress: () => {
            this.storyStore.removeItem(item.key);
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
  
  componentDidMount() {
    this.setState({imageTmp: JSON.parse(this.item.image)})    
    if(this.item.sound){
      this.initPlayer = this.soundStore.genMusicBySound(this.item.sound)
    }
  }

  genItemCamera(){
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={[
          styles.basicSize,
          this.item.category != "scene" ? {} : styles.background
        ]}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
      />
    )
  }

  genItemImage(){
    return (
      <Image
        source={this.state.imageTmp? this.state.imageTmp: JSON.parse(this.item.image)}
        style={[
          styles.basicSize,
          this.item.category != "scene" ? {} : styles.background
        ]}
      />
    )
  }
  
  render() {
    this.initStyle = JSON.parse(this.item.style);
    console.log('init', this.initStyle)
    if (!this.initStyle["position"]) this.initStyle["position"] = "absolute";
    let itemData = (this.item.category === "scene" && this.item.name === "相機")? this.genItemCamera(): this.genItemImage()
    if(this.item.sound && this.storyStore.isRecord){
      setTimeout(() => {
        this.soundStore.playSoundEffect(this.initPlayer, 0.3, 1)
      }, 500)
    }
    return (
      <Gestures
        draggable={this.item.category != "scene" ? true : false}
        rotatable={this.item.category != "scene" ? true : false}
        scalable={this.item.category != "scene" ? true : false}
        style={{ ...this.initStyle }}
        onEnd={(event, styles) => {
          this.item.style = JSON.stringify(styles);
          console.log(this.item.style)
          this.setState({imageTmp: JSON.parse(this.item.image)})
        }}
        onChange={(event, styles) => {
          if(this.item.animate) 
            this.setState({imageTmp: this.item.animate})
        }}
      >
        <TouchableHighlight
          onLongPress={() => {
            this.deleteImage(this.item);
          }}
          underlayColor="rgba(255, 255, 255, 0)"
        >
        {itemData}
          

          

        </TouchableHighlight>
      </Gestures>
    );
  }
}

const styles = StyleSheet.create({
  basicSize: {
    width: 200,
    height: 200
  },

  background: {
    width: VAR.BOARD_WIDTH,
    height: VAR.BOARD_HEIGHT,
    overflow: "hidden"
  }
});
