import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Alert } from "react-native";
import { inject, observer } from "mobx-react";
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";


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
          <Image style={styles.toolIcon} source={RES.Redo} />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  storyTool: {
    top: VAR.BOARD_TOP + 20,
    right: VAR.BOARD_RIGHT + 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "absolute",
    width: VAR.ICON_SIZE,
    height: VAR.ICON_SIZE
  },

  toolIcon: {
    width: VAR.ICON_SIZE,
    height: VAR.ICON_SIZE
  }
});
