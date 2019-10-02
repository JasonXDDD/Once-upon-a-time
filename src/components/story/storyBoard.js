import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { inject, observer } from "mobx-react";
import StoryItem from "./storyItem";
import { RNCamera } from 'react-native-camera';

import Teaching_BG from "../../assets/images/EditStory/Teaching.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2;
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.05;
const BOARD_POS_BASIC = 25;
const TOOL_PANE_WIDTH = 135;

@inject("rootStore")
@observer
export default class StoryBoard extends Component {
  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
  }

  render() {
    return (
      <View
        style={[
          styles.storyBoard,
          { right: BOARD_RIGHT, top: BOARD_TOP }
        ]}
      >
        <Image source={Teaching_BG} style={[styles.background]} />
        
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />

        {this.storyStore.storyScene[this.storyStore.selectSceneIndex].story.map(
          (ele, id) => {
            return <StoryItem key={ele.key} select={ele} idofarray={id} />;
          }
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  storyBoard: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    position: "absolute",
    backgroundColor: "#f6f6f6",
    borderColor: "#bebebe",
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 10,
  },

  background: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    overflow: 'hidden',
  }
});
