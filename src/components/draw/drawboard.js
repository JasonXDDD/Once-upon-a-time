import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import RNSketchCanvas from "@terrylinla/react-native-sketch-canvas";
import { inject, observer } from "mobx-react";
import DialogInput from "react-native-dialog-input";
import ViewShot from "react-native-view-shot";
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";


@inject("rootStore")
@observer
export default class DrawBoard extends Component {
  timeOut;
  buttonPlayer;
  deletePlayer;
  
  colorList = [
    { color: "#FF75B5FF", img: RES.cFF75B5, select: RES.sFF75B5, sound: 'piano_g3', player: {} },
    { color: "#FF403FFF", img: RES.cFF403F, select: RES.sFF403F, sound: 'piano_a3', player: {} },
    { color: "#FF7D1CFF", img: RES.cFF7D1C, select: RES.sFF7D1C, sound: 'piano_b3', player: {} },
    { color: "#FFFF57FF", img: RES.cFFFF57, select: RES.sFFFF57, sound: 'piano_c4', player: {} },
    { color: "#49C37CFF", img: RES.c49C37C, select: RES.s49C37C, sound: 'piano_d4', player: {} },
    { color: "#6BCCF7FF", img: RES.c6BCCF7, select: RES.s6BCCF7, sound: 'piano_e4', player: {} },
    { color: "#2367C0FF", img: RES.c2367C0, select: RES.s2367C0, sound: 'piano_f4', player: {} },
    { color: "#9323A1FF", img: RES.c9323A1, select: RES.s9323A1, sound: 'piano_g4', player: {} },
    { color: "#FFD298FF", img: RES.cFFD298, select: RES.sFFD298, sound: 'piano_a4', player: {} },
    { color: "#84574FFF", img: RES.c84574F, select: RES.s84574F, sound: 'piano_b4', player: {} },
    { color: "#FFFFFFFF", img: RES.cFFFFFF, select: RES.sFFFFFF, sound: 'piano_c5', player: {} },
    { color: "#000000FF", img: RES.c000000, select: RES.s000000, sound: 'piano_d5', player: {} },
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

    this.buttonPlayer = this.soundStore.genMusic('button')
    this.deletePlayer = this.soundStore.genMusic('delete')
  }

  render() {
    return (
      <ImageBackground source={RES.DrawBoard_IMG} resizeMode="contain" style={styles.drawBoard} >
        {/* draw pane size */}
        <View style={{
            position: "absolute",
            width: VAR.DRAW_PANE_WIDTH,
            height: VAR.DRAW_PANE_HEIGHT,
            top: VAR.DRAW_BOARD_HEIGHT * 0.035,
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
                  style={[ styles.icon, { position: "absolute", right: VAR.DRAW_PANE_WIDTH * 0.05, top: 100 } ]}
                  source={RES.Reback}
                />
              }
              onUndoPressed={() => {
                this.soundStore.playSoundEffect(this.buttonPlayer, 1, 0)
              }}
              clearComponent={
                <Image
                  style={[ styles.icon, { position: "absolute", right: VAR.DRAW_PANE_WIDTH * 0.05, top: 200 } ]}
                  source={RES.Redo}
                />
              }
              onClearPressed={() => {
                this.soundStore.playSoundEffect(this.deletePlayer, 1, 0)
                this.toolStore.drawItem = {}
              }}
              eraseComponent={
                <Image
                  style={[ styles.icon, { position: "absolute", left: VAR.DRAW_PANE_WIDTH * 0.05, top: 100 } ]}
                  source={RES.Eraser}
                />
              }
              strokeWidthComponent={(w) => {
                if(w/10 != this.state.selectStrockeToVoice)
                  this.setState({selectStrockeToVoice: w/10 })
                
                return (
                  <View style={{ position: "absolute", left: VAR.DRAW_PANE_WIDTH * -0.92, top: 200 }}>
                    <Image style={[ styles.icon ]} source={RES.Plus} />

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
            <Image source={RES.Camera} style={[styles.CameraIcon]} />
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
          width: VAR.DRAW_PANE_SIZE,
          height: VAR.DRAW_PANE_SIZE
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
    width: VAR.DRAW_BOARD_WIDTH,
    height: VAR.DRAW_BOARD_HEIGHT,
    right: VAR.DRAW_BOARD_RIGHT,
    position: "absolute",
    overflow: "hidden",
  },

  drawPane: {
    height: VAR.DRAW_PANE_SIZE,
    width: VAR.DRAW_PANE_SIZE,
  },

  drawPaneBG: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: (VAR.DRAW_PANE_WIDTH - VAR.DRAW_PANE_SIZE) / 2,
    top: VAR.DRAW_PANE_TOP,
    borderRadius: 10
  },

  imagePane: {
    position: "absolute",
    left: (VAR.DRAW_PANE_WIDTH - VAR.DRAW_PANE_SIZE) / 2,
    top: VAR.DRAW_PANE_TOP
  },

  photoPane: {
    // backgroundColor: "#AABBCC55",
    marginTop: VAR.DRAW_PANE_TOP,
    marginLeft: (VAR.DRAW_PANE_WIDTH - VAR.DRAW_PANE_SIZE) / 2
  },


  drawContaniner: {
    position: "absolute",
    width: VAR.DRAW_PANE_WIDTH,
    height: VAR.DRAW_PANE_HEIGHT,
    padding: 10
  },

  drawCanvas: {
    left: (VAR.DRAW_PANE_WIDTH - VAR.DRAW_PANE_SIZE) / 2 - 10,
    top: VAR.DRAW_PANE_TOP -10,
    marginBottom: VAR.DRAW_PANE_MARGIN_BOTTOM
  },


  icon: {
    height: VAR.DRAW_ICON_SIZE + 5,
    width: VAR.DRAW_ICON_SIZE
  },

  CameraIcon: {
    marginTop: 5,
    width: VAR.DRAW_ICON_SIZE + 18,
    height: VAR.DRAW_ICON_SIZE - 20,
  },

  colorIcon: {
    width: VAR.DRAW_ICON_SIZE - 3,
    height: VAR.DRAW_ICON_SIZE,
    marginLeft: -3,
  },

  selectColorIcon: {
    width: (VAR.DRAW_ICON_SIZE - 3) * 1.2,
    height: VAR.DRAW_ICON_SIZE * 1.2,
    marginLeft: -3
  },

  strokeWidthButton: {
    marginHorizontal: 10, marginVertical: 10, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center'
  },
});
