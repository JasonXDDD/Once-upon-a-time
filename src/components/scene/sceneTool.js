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

import Movie_Selected from "../../assets/images/EditStory/btn_movie_Selected.png";
import Movie_Unselected from "../../assets/images/EditStory/btn_movie_Unselected.png";
import BG_Scene_V from "../../assets/images/EditStory/BG_ScenesBar_v.png";
import BG_Scene_H from "../../assets/images/EditStory/BG_ScenesBar_h.png";
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
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.04;

@inject("rootStore")
@observer
export default class SceneTool extends Component {
  buttonPlayer;
  addPlayer;
  longPlayer;

  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.soundStore = props.rootStore.soundStore;
  }

  componentDidMount(){
    this.buttonPlayer = this.soundStore.genMusic('button')
    this.addPlayer = this.soundStore.genMusic('add')
    this.longPlayer = this.soundStore.genMusic('long_press')
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
              if(this.storyStore.selectSceneIndex > 0) 
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
      <View style={[
        styles.sceneTool, {
        top: this.storyStore.isRecord? BOARD_TOP + BOARD_HEIGHT - ICON_SIZE - 20: BOARD_TOP - 10,
        right: this.storyStore.isRecord? BOARD_RIGHT + BOARD_WIDTH - ICON_SIZE - 20: BOARD_RIGHT - ICON_SIZE - 30,
        flexDirection: this.storyStore.isRecord? "row": "column",
      }]}>
        {/* scene board */}
        <TouchableOpacity
          style={{ display: this.storyStore.isRecord ? "none" : "flex" }}
          onPress={() => {
            this.storyStore.openScenePane = !this.storyStore.openScenePane;
            this.soundStore.playSoundEffect(this.buttonPlayer, 1, 0)
          }}
        >
          <Image style={styles.sceneIcon} source={this.storyStore.openScenePane? Movie_Selected: Movie_Unselected} />
        </TouchableOpacity>

        <View
          style={[
            styles.scenePane,
            { display: this.storyStore.openScenePane ? "flex" : "none" },
            { flexDirection: this.storyStore.isRecord? "row": "column" },
            this.storyStore.isRecord ? styles.sceneRecordPane : {}
          ]}
        >
          <ImageBackground source={this.storyStore.isRecord? BG_Scene_H: BG_Scene_V} 
            style={[
              styles.sceneBar,
              {
                height: this.storyStore.isRecord? (BOARD_POS_BASIC + BOARD_WIDTH - ICON_SIZE * 2 - 60) * 120 / 850: BOARD_HEIGHT - ICON_SIZE * 2 - 10,
                width: this.storyStore.isRecord?   BOARD_POS_BASIC + BOARD_WIDTH - ICON_SIZE * 2 - 60: (BOARD_HEIGHT - ICON_SIZE * 2 - 10) * 120 / 850,
                flexDirection: this.storyStore.isRecord? "row": "column"
              }
            ]}>
            {this.storyStore.storyScene.map((ele, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  style={this.storyStore.isRecord? styles.sceneItemRecord: styles.sceneItem}
                  onPress={() => {
                    this.soundStore.playSoundEffect(this.buttonPlayer, 1, 0)
                    this.storyStore.selectSceneIndex = id;
                  }}
                  onPressIn={() => {
                    this.soundStore.playSoundEffect(this.longPlayer, .8, 0)
                  }}
                  delayLongPress={1000}
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
              if (this.storyStore.storyScene.length < 5) {
                this.soundStore.playSoundEffect(this.addPlayer, 1, 0)
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
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  scenePane: {
    alignItems: "center"
  },

  sceneRecordPane: {
    display: "flex",
    position: "absolute",
    bottom: -1 * (ICON_SIZE + 15 + 50),
    left: ICON_SIZE
  },

  sceneBar: {
    alignItems: "center",
    marginVertical: 15
  },

  sceneIcon: {
    width: ICON_SIZE + 10,
    height: ICON_SIZE + 10
  },

  sceneItemRecord: {  marginHorizontal: 20, left: 150 },
  sceneItem: { marginVertical: 10, top: 70 },

  toolIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  toolNumber: {
    left: (ICON_SIZE * 0.9) * 60 / 100 - 6,
    position: "absolute",
    top: (ICON_SIZE * 0.9) / 2 - 12,
    fontSize: 20,
    color: "#ef9d17",
    fontWeight: "bold"
  },

  NumberBackground: {
    width: (ICON_SIZE * 0.9) * 60 / 50,
    height: ICON_SIZE * 0.9
  }
});
