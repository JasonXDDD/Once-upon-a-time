import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";

import Redo from "../../assets/images/EditStory/btn_redo.png";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76
const BOARD_HEIGHT = screenHeight * 0.7
const ICON_SIZE = 60;
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2;
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.06;

@inject("rootStore")
@observer
export default class StoryTool extends Component {
  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
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
            this.storyStore.storyScene[
              this.storyStore.selectSceneIndex
            ].story = [];
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
