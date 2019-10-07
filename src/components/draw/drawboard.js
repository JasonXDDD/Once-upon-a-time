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
const BOARD_WIDTH = screenHeight * 1590 / 1536;
const BOARD_HEIGHT = screenHeight;
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2;
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.04;
const BOARD_POS_BASIC = 25;
const TOOL_PANE_WIDTH = 135;
const ICON_SIZE = 70;

const DRAW_BOARD_WIDTH = BOARD_WIDTH;
const DRAW_BOARD_HEIGHT = (BOARD_WIDTH) * 38 / 55;
const DRAW_PANE_SIZE = DRAW_BOARD_HEIGHT * 0.83;
const DRAW_PANE_TOP = 60;
const DRAW_PANE_MARGIN_BOTTOM = 50;

@inject("rootStore")
@observer
export default class DrawBoard extends Component {
  timeOut;
  colorPlayer;
  
  colorList = [
    { color: "#FF75B5FF", img: cFF75B5, select: sFF75B5, sound: 'piano_g3', player: {} },
    { color: "#FF403FFF", img: cFF403F, select: sFF403F, sound: 'piano_a3', player: {} },
    { color: "#FF7D1CFF", img: cFF7D1C, select: sFF7D1C, sound: 'piano_b3', player: {} },
    { color: "#FFFF57FF", img: cFFFF57, select: sFFFF57, sound: 'piano_c4', player: {} },
    { color: "#49C37CFF", img: c49C37C, select: s49C37C, sound: 'piano_d4', player: {} },
    { color: "#6BCCF7FF", img: c6BCCF7, select: s6BCCF7, sound: 'piano_e4', player: {} },
    { color: "#2367C0FF", img: c2367C0, select: s2367C0, sound: 'piano_f4', player: {} },
    { color: "#9323A1FF", img: c9323A1, select: s9323A1, sound: 'piano_g4', player: {} },
    { color: "#FFD298FF", img: cFFD298, select: sFFD298, sound: 'piano_a4', player: {} },
    { color: "#84574FFF", img: c84574F, select: s84574F, sound: 'piano_b4', player: {} },
    { color: "#FFFFFFFF", img: cFFFFFF, select: sFFFFFF, sound: 'piano_c5', player: {} },
    { color: "#000000FF", img: c000000, select: s000000, sound: 'piano_d5', player: {} },
  ];

  state = {
    isDialogVisible: false,
    selectColor: '#FF75B5FF',
    selectStrockeToVoice: 0.6
  };

  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
    this.soundStore = props.rootStore.soundStore;
  }

  componentWillMount(){
    let self = this
    this.colorList.forEach(ele => {
      ele.player = self.soundStore.genMusic(ele.sound)
    })
  }

  render() {
    return (
      <ImageBackground source={DrawBoard_IMG} resizeMode="contain" style={styles.drawBoard} >
        {/* draw pane size */}
        <View style={{
            position: "absolute",
            width: DRAW_BOARD_WIDTH,
            height: DRAW_BOARD_HEIGHT,
            top: BOARD_HEIGHT * 0.035,
            left: 0
          }}
        >
          {/* pane style */}
          <View style={[ styles.drawPane, styles.drawPaneBG ]}/>

          {/* snapshot */}
          <ViewShot ref="viewShot" options={{ format: "png", result: "data-uri" }}>
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
              strokeSelectedComponent={(color, index, changed) => {
                if(changed) {
                  this.setState({selectColor: color})
                }
                this.soundStore.playSoundEffect(this.colorList[index].player, this.state.selectStrockeToVoice, 0)
                
                return (
                  <ImageBackground source={this.colorList[index].select} style={ styles.selectColorIcon }>
                    <View style={{ backgroundColor: color, opacity: 1 }} />
                  </ImageBackground>
                )
              }}
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
              strokeWidthComponent={(w) => {
                if(w/10 != this.state.selectStrockeToVoice)
                  this.setState({selectStrockeToVoice: w/10 })
                
                return (
                  <View style={{ position: "absolute", left: DRAW_BOARD_WIDTH * -0.92, top: 200 }}>
                    <Image style={[ styles.icon ]} source={Plus} />

                    <View style={[styles.strokeWidthButton, { backgroundColor: this.state.selectColor }]}>
                      <View  style={{
                        backgroundColor: 'white', marginBottom: 1,
                        width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                      }} />
                    </View>
                  </View>
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
              left: "45%",
              top: 5
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
          cancelText={"取消"}
          submitText={"儲存"}
          dialogStyle={{top: 180, position: 'absolute'}}
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

  updateStrokeToVoice(w){
  }
  updateColor(color){
    this.setState({selectColor: color})
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
    height: BOARD_HEIGHT,
    right: BOARD_RIGHT,
    position: "absolute",
    overflow: "hidden",
  },

  drawPane: {
    height: DRAW_PANE_SIZE,
    width: DRAW_PANE_SIZE,
  },

  drawPaneBG: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
    top: DRAW_PANE_TOP,
    borderRadius: 10
  },

  imagePane: {
    position: "absolute",
    left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
    top: DRAW_PANE_TOP
  },

  photoPane: {
    // backgroundColor: "#AABBCC55",
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
    top: DRAW_PANE_TOP -10,
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
    width: ICON_SIZE - 3,
    height: ICON_SIZE,
    marginLeft: -3,
  },

  selectColorIcon: {
    width: (ICON_SIZE - 3) * 1.2,
    height: ICON_SIZE * 1.2,
    marginLeft: -3
  },

  strokeWidthButton: {
    marginHorizontal: 10, marginVertical: 10, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center'
  },
});
