import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import { inject, observer } from "mobx-react";

import Save from "../../assets/images/EditStory/btn_save.png";
import BG_Scene from "../../assets/images/EditStory/BG_ScenesBar.png";
import Btn_NumberBackground from "../../assets/images/EditStory/Btn_SceneNumberBackground.png";
import Btn_NumberBackground_Selected from "../../assets/images/EditStory/Btn_SceneNumberBackground_selected.png";
import Btn_AddScene from "../../assets/images/EditStory/Btn_AddScene.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const ICON_SIZE = 50;
const BOARD_POS_BASIC = 25;
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2;
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.06;

@inject("rootStore")
@observer
export default class SceneTool extends Component {
  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
  }

  deleteScene(id) {
    Alert.alert(
      "確定要刪除場景嗎？",
      id + 1,
      [
        {
          text: "確定",
          onPress: () => {
            if(this.storyStore.storyScene.length == 1) {
              Alert.alert("最後一張囉！不能刪了")
            }
            else {
              this.storyStore.selectSceneIndex = this.storyStore.selectSceneIndex - 1;
              this.storyStore.storyScene.splice(id, 1);
            }
            
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
      <View style={[styles.sceneTool]}>
        {/* scene board */}
        <TouchableOpacity
          style={{ display: this.storyStore.isRecord ? "none" : "flex" }}
          onPress={() => {
            this.storyStore.openScenePane = !this.storyStore.openScenePane;
          }}
        >
          <Image style={styles.sceneIcon} source={Save} />
        </TouchableOpacity>

        <View
          style={[
            styles.scenePane,
            { display: this.storyStore.openScenePane ? "flex" : "none" },
            this.storyStore.isRecord ? styles.sceneRecordPane : {}
          ]}
        >
          <ImageBackground source={BG_Scene} style={[styles.sceneBar]}>
            {this.storyStore.storyScene.map((ele, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  style={{ marginHorizontal: 10, left: 100 }}
                  onPress={() => {
                    this.storyStore.selectSceneIndex = id;
                  }}
                  onLongPress={() => {
                    this.storyStore.selectSceneIndex = id;
                    this.deleteScene(id);
                  }}
                >
                  <Image
                    style={styles.NumberBackground}
                    source={this.storyStore.selectSceneIndex === id? Btn_NumberBackground_Selected: Btn_NumberBackground}
                  />
                  <Text style={styles.toolNumber}>{id + 1}</Text>
                </TouchableOpacity>
              );
            })}
          </ImageBackground>

          <TouchableOpacity
            style={{ display: this.storyStore.isRecord ? "none" : "flex" }}
            onPress={() => {
              if (this.storyStore.storyScene.length < 7) {
                this.storyStore.storyScene.push({ story: [] });
                this.storyStore.selectSceneIndex =
                  this.storyStore.storyScene.length - 1;
              }
            }}
          >
            <Image style={styles.toolIcon} source={Btn_AddScene} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sceneTool: {
    top: BOARD_TOP + BOARD_HEIGHT - ICON_SIZE - 20,
    right: BOARD_RIGHT + BOARD_WIDTH - ICON_SIZE - 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  scenePane: {
    flexDirection: "row",
    alignItems: "center"
  },

  sceneRecordPane: {
    display: "flex",
    position: "absolute",
    bottom: -1 * (ICON_SIZE + 15 + 50),
    left: ICON_SIZE
  },

  sceneBar: {
    width: BOARD_POS_BASIC + BOARD_WIDTH - ICON_SIZE * 2 - 60,
    height: ICON_SIZE + 20,
    flexDirection: "row",
    alignItems: "center"
  },

  sceneIcon: {
    width: ICON_SIZE * 1.1,
    height: ICON_SIZE * 1.1
  },

  toolIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  toolNumber: {
    left: ICON_SIZE * 60 / 100 - 6,
    position: "absolute",
    top: ICON_SIZE / 2 - 12,
    fontSize: 20,
    color: "#ef9d17",
    fontWeight: "bold"
  },

  NumberBackground: {
    width: ICON_SIZE * 60 / 50,
    height: ICON_SIZE
  }
});
