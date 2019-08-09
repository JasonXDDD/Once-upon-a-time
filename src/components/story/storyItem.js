import React, { Component } from "react";
import {
  TouchableHighlight,
  Image,
  Alert,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
import { inject, observer } from "mobx-react";
import Gestures from "react-native-easy-gestures";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;

@inject("rootStore")
@observer
export default class StoryItem extends React.Component {
  initStyle;

  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
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

  render() {
    this.initStyle = JSON.parse(this.item.style);
    if (!this.initStyle["position"]) this.initStyle["position"] = "absolute";

    return (
      <Gestures
        draggable={this.item.category != "scene" ? true : false}
        rotatable={this.item.category != "scene" ? true : false}
        scalable={this.item.category != "scene" ? true : false}
        style={{ ...this.initStyle }}
        onEnd={(event, styles) => {
          this.item.style = JSON.stringify(styles);
        }}
      >
        <TouchableHighlight
          onLongPress={() => {
            this.deleteImage(this.item);
          }}
          underlayColor="rgba(255, 255, 255, 0)"
        >
          <Image
            source={JSON.parse(this.item.image)}
            style={[
              styles.basicSize,
              this.item.category != "scene" ? {} : styles.background
            ]}
          />
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
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    overflow: "hidden"
  }
});
