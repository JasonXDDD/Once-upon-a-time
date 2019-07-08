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
import ViewShot from "react-native-view-shot";

import DrawBoard_IMG from "../../assets/images/DrawStory/drawBoard.png";
import Redo from "../../assets/images/DrawStory/btn_clean.png";
import Reback from "../../assets/images/DrawStory/btn_reback.png";
import Eraser from "../../assets/images/DrawStory/btn_eraser.png";
import Plus from "../../assets/images/DrawStory/btn_penPlus.png";
import Delete from "../../assets/images/StoryBox/Btn_delete.png";
import Camera from "../../assets/images/DrawStory/btn_camera.png";

import c6BCCF7 from "../../assets/images/DrawStory/color/btn_page03_Aqua_blue.png";
import s6BCCF7 from "../../assets/images/DrawStory/color/btn_page03_Aqua_blue_selected.png";
import c000000 from "../../assets/images/DrawStory/color/btn_page03_black.png";
import s000000 from "../../assets/images/DrawStory/color/btn_page03_black_selected.png";
import c2367C0 from "../../assets/images/DrawStory/color/btn_page03_blue.png";
import s2367C0 from "../../assets/images/DrawStory/color/btn_page03_blue_selected.png";
import c84574F from "../../assets/images/DrawStory/color/btn_page03_Brown.png";
import s84574F from "../../assets/images/DrawStory/color/btn_page03_Brown_selected.png";
import c49C37C from "../../assets/images/DrawStory/color/btn_page03_green.png";
import s49C37C from "../../assets/images/DrawStory/color/btn_page03_green_selected.png";
import cFF7D1C from "../../assets/images/DrawStory/color/btn_page03_orange.png";
import sFF7D1C from "../../assets/images/DrawStory/color/btn_page03_orange_selected.png";
import cFF75B5 from "../../assets/images/DrawStory/color/btn_page03_Pink.png";
import sFF75B5 from "../../assets/images/DrawStory/color/btn_page03_Pink_selected.png";
import c9323A1 from "../../assets/images/DrawStory/color/btn_page03_purple.png";
import s9323A1 from "../../assets/images/DrawStory/color/btn_page03_purple_selected.png";
import cFF403F from "../../assets/images/DrawStory/color/btn_page03_Red.png";
import sFF403F from "../../assets/images/DrawStory/color/btn_page03_Red_selected.png";
import cFFD298 from "../../assets/images/DrawStory/color/btn_page03_skin_color.png";
import sFFD298 from "../../assets/images/DrawStory/color/btn_page03_skin_color_selected.png";
import cFFFFFF from "../../assets/images/DrawStory/color/btn_page03_white.png";
import sFFFFFF from "../../assets/images/DrawStory/color/btn_page03_white_selected.png";
import cFFFF57 from "../../assets/images/DrawStory/color/btn_page03_yellow.png";
import sFFFF57 from "../../assets/images/DrawStory/color/btn_page03_yellow_selected.png";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2;
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.06;
const BOARD_POS_BASIC = 25;
const TOOL_PANE_WIDTH = 135;
const ICON_SIZE = 70;

const DRAW_BOARD_WIDTH = BOARD_WIDTH * 0.98;
const DRAW_BOARD_HEIGHT = BOARD_HEIGHT * 0.98;
const DRAW_PANE_SIZE = 500;
const DRAW_PANE_TOP = 60;
const DRAW_PANE_MARGIN_BOTTOM = 0;

@inject("rootStore")
@observer
export default class DrawBoard extends Component {
  colorList = [
    { color: "#FF75B5", img: cFF75B5, select: sFF75B5 },
    { color: "#FF403F", img: cFF403F, select: sFF403F },
    { color: "#FF7D1C", img: cFF7D1C, select: sFF7D1C },
    { color: "#FFFF57", img: cFFFF57, select: sFFFF57 },
    { color: "#49C37C", img: c49C37C, select: s49C37C },
    { color: "#6BCCF7", img: c6BCCF7, select: s6BCCF7 },
    { color: "#2367C0", img: c2367C0, select: s2367C0 },
    { color: "#9323A1", img: c9323A1, select: s9323A1 },
    { color: "#FFD298", img: cFFD298, select: sFFD298 },
    { color: "#84574F", img: c84574F, select: s84574F },
    { color: "#FFFFFF", img: cFFFFFF, select: sFFFFFF },
    { color: "#000000", img: c000000, select: s000000 }
  ];

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
      <ImageBackground source={DrawBoard_IMG} resizeMode="contain" style={styles.drawBoard} >
        {/* draw pane size */}
        <View style={{
            position: "absolute",
            width: DRAW_BOARD_WIDTH,
            height: DRAW_BOARD_HEIGHT,
            top: BOARD_HEIGHT * 0.07,
            left: BOARD_WIDTH * 0.01
          }}
        >
          {/* pane style */}
          <View style={[ styles.drawPane, styles.drawPaneBG ]}/>

          {/* snapshot */}
          <ViewShot ref="viewShot" options={{ format: "png" }}>
            {/* import image */}
            <View style={[ styles.drawPane, styles.imagePane ]}>
              {this.genImage(this.toolStore.drawItem)}
            </View>

            {/* target */}
            <View style={[ styles.drawPane, styles.photoPane]}/>

            <RNSketchCanvas
              containerStyle={ styles.drawContaniner }
              canvasStyle={[ styles.drawPane, styles.drawCanvas ]}
              defaultStrokeIndex={0}
              defaultStrokeWidth={6}
              strokeColors={this.colorList}
              
              strokeComponent={color => {
                let item = this.colorList.filter(ele => ele.color === color)[0]
                return (
                <ImageBackground source={item.img} style={ styles.colorIcon }>
                  <View style={{ backgroundColor: color, opacity: 1 }} />
                </ImageBackground>
              )
            }}
              strokeSelectedComponent={(color, index, changed) => (
                <ImageBackground source={this.colorList[index].select} style={ styles.colorIcon }>
                  <View style={{ backgroundColor: color, opacity: 1 }} />
                </ImageBackground>
              )}
              undoComponent={
                <Image
                  style={[ styles.icon, { position: "absolute", right: DRAW_BOARD_WIDTH * 0.05, top: 100 } ]}
                  source={Reback}
                />
              }
              clearComponent={
                <Image
                  style={[ styles.icon, { position: "absolute", right: DRAW_BOARD_WIDTH * 0.05, top: 200 } ]}
                  source={Redo}
                />
              }
              onClearPressed={() => {
                this.toolStore.drawItem = {}
              }}
              eraseComponent={
                <Image
                  style={[ styles.icon, { position: "absolute", left: DRAW_BOARD_WIDTH * 0.05, top: 100 } ]}
                  source={Eraser}
                />
              }
              strokeWidthComponent={w => {
                return (
                  <Image
                    style={[ styles.icon, { position: "absolute", left: DRAW_BOARD_WIDTH * -0.92, top: 200 } ]}
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
}

const styles = StyleSheet.create({
  drawBoard: {
    width: BOARD_WIDTH,
    height: screenHeight,
    right: BOARD_RIGHT,
    position: "absolute",
    overflow: "hidden"
  },

  drawPane: {
    height: DRAW_PANE_SIZE,
    width: DRAW_PANE_SIZE,
  },

  drawPaneBG: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
    top: DRAW_PANE_TOP
  },

  imagePane: {
    position: "absolute",
    left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
    top: DRAW_PANE_TOP
  },

  photoPnae: {
    marginTop: DRAW_PANE_TOP,
    marginLeft: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2
  },


  drawContaniner: {
    position: "absolute",
    width: DRAW_BOARD_WIDTH,
    height: DRAW_BOARD_HEIGHT,
    padding: 10
  },

  drawCanvas: {
    left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2 - 10,
    top: DRAW_PANE_TOP,
    marginBottom: DRAW_PANE_MARGIN_BOTTOM
  },


  icon: {
    height: ICON_SIZE + 5,
    width: ICON_SIZE
  },

  CameraIcon: {
    marginTop: 0,
    width: ICON_SIZE + 18,
    height: ICON_SIZE - 20,
  },

  colorIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginTop: 50,
    marginLeft: -3
  }
});
