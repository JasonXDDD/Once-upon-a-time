import React, { Component } from "react";
import { ImageBackground, Alert, Text, View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react";
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";

import MusicItem from "../story/musicItem";



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
      <ImageBackground style={[styles.musicBoard, {display: this.storyStore.isRecord? 'flex': 'none'}]} source={RES.BG_Music}>
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
    left: (VAR.SCREEN_WIDTH - VAR.PANE_WIDTH) / 2,
    width: VAR.PANE_WIDTH,
    height: VAR.PANE_HEIGHT,
    alignItems: 'flex-end'
  },

  musicPane: {
    width: VAR.PANE_WIDTH - 100, 
    flexDirection: 'row'
  }
});
