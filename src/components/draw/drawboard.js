import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import RNSketchCanvas from "@terrylinla/react-native-sketch-canvas";
import { inject, observer } from "mobx-react";
import DialogInput from "react-native-dialog-input";

import DrawBoard_IMG from "../../assets/images/DrawStory/drawBoard.png";
import Redo from "../../assets/images/DrawStory/btn_clean.png";
import Reback from "../../assets/images/DrawStory/btn_reback.png";
import Eraser from "../../assets/images/DrawStory/btn_eraser.png";
import Plus from "../../assets/images/DrawStory/btn_penPlus.png";
import Delete from "../../assets/images/StoryBox/Btn_delete.png";
import Camera from "../../assets/images/DrawStory/btn_camera.png";
import ViewShot from "react-native-view-shot";

import Hide from "../../assets/images/DrawStory/hide.png";
import Pink from "../../assets/images/DrawStory/Pink.png";
import PinkSelect from "../../assets/images/DrawStory/Pink_selected.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const BOARD_POS_BASIC = 25;
const TOOL_PANE_WIDTH = 135;
const ICON_SIZE = 48;

const DRAW_BOARD_WIDTH = BOARD_WIDTH * 0.98;
const DRAW_BOARD_HEIGHT = BOARD_HEIGHT * 0.98;
const DRAW_PANE_SIZE = 400;

@inject("rootStore")
@observer
export default class DrawBoard extends Component {
  colorList = [
    { color: "rgba(255, 255, 255, 0)", img: Pink, select: PinkSelect },
    { color: "#FF75B5", img: Pink, select: PinkSelect },
    { color: "#FF403F", img: Pink, select: PinkSelect },
    { color: "#FF7D1C", img: Pink, select: PinkSelect },
    { color: "#FFFF57", img: Pink, select: PinkSelect },
    { color: "#49C37C", img: Pink, select: PinkSelect },
    { color: "#6BCCF7", img: Pink, select: PinkSelect },
    { color: "#2367C0", img: Pink, select: PinkSelect },
    { color: "#9323A1", img: Pink, select: PinkSelect },
    { color: "#FFD298", img: Pink, select: PinkSelect },
    { color: "#84574F", img: Pink, select: PinkSelect },
    { color: "#FFFFFF", img: Pink, select: PinkSelect },
    { color: "#000000", img: Pink, select: PinkSelect }
  ];
  colorImgList = [1, 2, 3];

  state = {
    isDialogVisible: false
  };

  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
  }

  render() {
    return (
      <ImageBackground
        source={DrawBoard_IMG}
        resizeMode="contain"
        style={[styles.drawBoard, { right: this.getRight() }]}
      >
        {/* draw pane size */}
        <View
          style={{
            position: "absolute",
            width: DRAW_BOARD_WIDTH,
            height: DRAW_BOARD_HEIGHT,
            top: BOARD_HEIGHT * 0.07,
            left: BOARD_WIDTH * 0.01
          }}
        >
          {/* pane style */}
          <View
            style={[
              styles.drawPane,
              {
                backgroundColor: "#FFFFFF",
                position: "absolute",
                left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
                top: 100
              }
            ]}
          />

          {/* snapshot */}
          <ViewShot ref="viewShot" options={{ format: "png" }}>
            {/* import image */}
            <View
              style={[
                styles.drawPane,
                {
                  position: "absolute",
                  left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
                  top: 100
                }
              ]}
            >
              {this.genImage(this.toolStore.drawItem)}
            </View>

            {/* target */}
            <View
              style={[
                styles.drawPane,
                {
                  marginTop: ICON_SIZE,
                  marginLeft: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2
                }
              ]}
            />

            <RNSketchCanvas
              containerStyle={{
                position: "absolute",
                width: DRAW_BOARD_WIDTH,
                height: DRAW_BOARD_HEIGHT,
                padding: 10
              }}
              canvasStyle={[
                styles.drawPane,
                {
                  left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2 - 10,
                  top: 100,
                  marginBottom: 100
                }
              ]}
              defaultStrokeIndex={0}
              defaultStrokeWidth={6}
              strokeColors={this.colorList}
              strokeComponent={color => (
                <ImageBackground
                  source={Pink}
                  style={{
                    width: 70,
                    height: 70,
                    marginTop: 100,
                    marginLeft: -3
                  }}
                >
                  <View
                    style={[
                      { backgroundColor: color, opacity: 1 },
                      styles.strokeColorButton
                    ]}
                  />
                </ImageBackground>
              )}
              strokeSelectedComponent={(color, index, changed) => {
                return (
                  <ImageBackground
                    source={PinkSelect}
                    style={{
                      width: 70,
                      height: 70,
                      marginTop: 100,
                      marginLeft: -3
                    }}
                  >
                    <View
                      style={[
                        { backgroundColor: color, opacity: 1 },
                        styles.strokeColorButton
                      ]}
                    />
                  </ImageBackground>
                );
              }}
              undoComponent={
                <Image
                  style={[
                    styles.icon,
                    {
                      position: "absolute",
                      right: DRAW_BOARD_WIDTH * 0.07,
                      top: 150,
                      width: 58,
                      height: 63
                    }
                  ]}
                  source={Reback}
                />
              }
              clearComponent={
                <Image
                  style={[
                    styles.icon,
                    {
                      position: "absolute",
                      right: DRAW_BOARD_WIDTH * 0.07,
                      top: 250,
                      width: 58,
                      height: 63
                    }
                  ]}
                  source={Redo}
                />
              }
              eraseComponent={
                <Image
                  style={[
                    styles.icon,
                    {
                      position: "absolute",
                      left: DRAW_BOARD_WIDTH * 0.07,
                      top: 130,
                      width: 70,
                      height: 73
                    }
                  ]}
                  source={Eraser}
                />
              }
              strokeWidthComponent={w => {
                return (
                  <Image
                    style={[
                      styles.icon,
                      {
                        position: "absolute",
                        left: DRAW_BOARD_WIDTH * -0.9,
                        top: 230,
                        width: 70,
                        height: 75
                      }
                    ]}
                    source={Plus}
                  />
                );
              }}
            />
          </ViewShot>

          <TouchableOpacity
            onPress={() => {
              this.setState({ isDialogVisible: true });
            }}
            style={{
              position: "absolute",
              left: "46%"
            }}
          >
            <Image source={Camera} style={[styles.CameraIcon]} />
          </TouchableOpacity>
        </View>

        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={"他叫什麼名字？"}
          message={"請給他一個名字吧"}
          hintInput={"名字"}
          submitInput={inputText => {
            this.snapshot(inputText);
            this.setState({ isDialogVisible: false });
          }}
          closeDialog={() => {
            this.setState({ isDialogVisible: false });
          }}
        />
      </ImageBackground>
    );
  }

  snapshot(name) {
    this.refs["viewShot"].capture().then(uri => {
      this.toolStore.sticker.push({
        id: name,
        image: JSON.stringify({
          uri: uri,
          width: DRAW_PANE_SIZE,
          height: DRAW_PANE_SIZE
        })
      });

      this.toolStore.open = "sticker";
    });
  }

  genImage(ele) {
    if (ele.image) {
      return <Image style={styles.drawPane} source={JSON.parse(ele.image)} />;
    }
  }
  getRight() {
    if (this.toolStore.open !== "")
      return -1 * (TOOL_PANE_WIDTH - BOARD_POS_BASIC);
    else {
      if (this.storyStore.isRecord) return screenWidth / 2 - BOARD_WIDTH / 2;
      // be center
      else return BOARD_POS_BASIC;
    }
  }
}

const styles = StyleSheet.create({
  drawBoard: {
    width: BOARD_WIDTH,
    height: 920,
    position: "absolute",
    overflow: "hidden"
  },

  drawPane: {
    height: 400,
    width: 400
  },

  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE
  },

  CameraIcon: {
    marginTop: 20,
    width: 100,
    height: 60,
    marginBottom: 20
  },

  strokeColorButton: {
    height: 0,
    flexDirection: "column"
  },

  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39579A",
    right: 575
  }
});
