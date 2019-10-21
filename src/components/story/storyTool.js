import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Alert } from "react-native";
import { inject, observer } from "mobx-react";

import Redo from "../../assets/images/EditStory/btn_redo.png";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76
const BOARD_HEIGHT = screenHeight * 0.7
const ICON_SIZE = 60;
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2;
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.04;

@inject("rootStore")
@observer
export default class StoryTool extends Component {
  deletePlayer;

  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.soundStore = props.rootStore.soundStore;
  }

  componentDidMount(){
    this.deletePlayer = this.soundStore.genMusic('delete')
  }

  cleaerScene() {
    Alert.alert(
      "確定要清除場景嗎？",
      this.storyStore.selectSceneIndex + 1,
      [
        {
          text: "確定",
          onPress: () => {
            this.storyStore.storyScene[
              this.storyStore.selectSceneIndex
            ].story = [];
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
      <View
        style={[
          styles.storyTool,
          { display: this.storyStore.isRecord ? "none" : "flex" }
        ]}
      >
        {/* clear board */}
        <TouchableOpacity
          onPress={() => {
            this.soundStore.playSoundEffect(this.deletePlayer, 1, 0)
            this.cleaerScene()
          }}
        >
          <Image style={styles.toolIcon} source={Redo} />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  storyTool: {
    top: BOARD_TOP + 20,
    right: BOARD_RIGHT + 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "absolute",
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  toolIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  }
});
