import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Alert } from "react-native";
import { inject, observer } from "mobx-react";
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";

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
      <View style={[styles.sceneTool, {
        top: this.storyStore.isRecord? VAR.BOARD_TOP + 30: VAR.BOARD_TOP - 10,
        right: this.storyStore.isRecord? VAR.BOARD_RIGHT - VAR.SCENE_ICON_SIZE - 60: VAR.BOARD_RIGHT - VAR.SCENE_ICON_SIZE - 30,
      }]}>
        {/* scene board */}
        <TouchableOpacity
          style={{ display: this.storyStore.isRecord ? "none" : "flex" }}
          onPress={() => {
            this.storyStore.openScenePane = !this.storyStore.openScenePane;
            this.soundStore.playSoundEffect(this.buttonPlayer, 1, 0)
          }}
        >
          <Image style={styles.sceneIcon} source={this.storyStore.openScenePane? RES.Movie_Selected: RES.Movie_Unselected} />
        </TouchableOpacity>

        <View
          style={[
            styles.scenePane,
            { display: this.storyStore.openScenePane ? "flex" : "none" },
          ]}
        >
          <ImageBackground source={RES.BG_Scene_V}  style={styles.sceneBar}>
            {this.storyStore.storyScene.map((ele, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  style={styles.sceneItem}
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
                    source={this.storyStore.selectSceneIndex === id? RES.Btn_NumberBackground_Selected: RES.Btn_NumberBackground}
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
                this.storyStore.storyScene.push({ story: [], music: [] });
                this.storyStore.selectSceneIndex =
                  this.storyStore.storyScene.length - 1;
              }
            }}
          >
            <Image style={styles.toolIcon} source={RES.Btn_AddScene} />
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
    flexDirection: "column",
    width: VAR.SCENE_ICON_SIZE,
    height: VAR.SCENE_ICON_SIZE
  },

  scenePane: {
    alignItems: "center",
    flexDirection: "column"
  },

  sceneRecordPane: {
    display: "flex",
    position: "absolute",
    bottom: -1 * (VAR.SCENE_ICON_SIZE + 15 + 50),
    left: VAR.SCENE_ICON_SIZE
  },

  sceneBar: {
    alignItems: "center",
    marginVertical: 15,
    height: VAR.BOARD_HEIGHT - VAR.SCENE_ICON_SIZE * 2 - 10,
    width: (VAR.BOARD_HEIGHT - VAR.SCENE_ICON_SIZE * 2 - 10) * 120 / 850,
    flexDirection: "column"
  },

  sceneIcon: {
    width: VAR.SCENE_ICON_SIZE + 10,
    height: VAR.SCENE_ICON_SIZE + 10
  },

  sceneItemRecord: {  marginHorizontal: 20, left: 150 },
  sceneItem: { marginVertical: 10, top: VAR.SCREEN_HEIGHT > 800? 70: 50 },

  toolIcon: {
    width: VAR.SCENE_ICON_SIZE,
    height: VAR.SCENE_ICON_SIZE
  },

  toolNumber: {
    left: (VAR.SCENE_ICON_SIZE * 0.9) * 60 / 100 - 6,
    position: "absolute",
    top: (VAR.SCENE_ICON_SIZE * 0.9) / 2 - 12,
    fontSize: 20,
    color: "#ef9d17",
    fontWeight: "bold"
  },

  NumberBackground: {
    width: (VAR.SCENE_ICON_SIZE * 0.9) * 60 / 50,
    height: VAR.SCENE_ICON_SIZE * 0.9
  }
});
