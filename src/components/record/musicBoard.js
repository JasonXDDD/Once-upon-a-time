import React, { Component } from "react";
import {
  ImageBackground,
  Alert,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { inject, observer } from "mobx-react";

import BG_Music from "../../assets/images/RecordStory/BG_Music.png";
import MusicItem from "../story/musicItem";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const PANE_WIDTH = 1406 * 0.55
const PANE_HEIGHT = 239 * 0.55

@inject("rootStore")
@observer
export default class MusicBoard extends React.Component {
  initStyle;
  initPlayer;


  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.soundStore = props.rootStore.soundStore;
    this.item = props.select;
    this.id = props.idofarray;
  }
  
  componentDidMount() {
 
  }

  
  render() {
    return (
      <ImageBackground style={[styles.musicBoard, {display: this.storyStore.isRecord? 'flex': 'none'}]} source={BG_Music}>
        <View style={styles.musicPane}>
          {this.storyStore.storyScene[this.storyStore.selectSceneIndex].music.map(
            (ele, id) => {
              console.log(ele)
              return <MusicItem key={ele.key} select={ele} idofarray={id} />
            }
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  musicBoard: {
    position: 'absolute',
    bottom: 25,
    left: (screenWidth - PANE_WIDTH) / 2,
    width: PANE_WIDTH,
    height: PANE_HEIGHT,
    alignItems: 'flex-end'
  },

  musicPane: {
    width: PANE_WIDTH - 100, 
    flexDirection: 'row'
  }
});
