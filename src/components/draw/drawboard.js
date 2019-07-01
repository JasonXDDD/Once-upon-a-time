
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'
import { inject, observer } from "mobx-react"

import DrawBoard_IMG from '../../assets/images/DrawStory/drawBoard.png'
import Redo from '../../assets/images/EditStory/btn_redo.png'
import Reback from '../../assets/images/DrawStory/btn_reback.png'
import Eraser from '../../assets/images/DrawStory/btn_eraser.png'
import Plus from '../../assets/images/DrawStory/btn_penPlus.png'
import Delet from '../../assets/images/LookStory/Btn_delete.png'
import Camera from '../../assets/images/DrawStory/btn_camera.png'
import ViewShot from 'react-native-view-shot';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const BOARD_POS_BASIC = 25;
const TOOL_PANE_WIDTH = 135;
const ICON_SIZE = 48;


@inject('rootStore')
@observer
export default class DrawBoard extends Component {
	constructor(props){
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
	}
	
	render() {
		return (
      <ImageBackground source={DrawBoard_IMG} resizeMode='contain' style={[styles.drawBoard, {right: this.getRight()}]}>
        

        {/* draw pane size */}
        <View style={{
          backgroundColor: '#00000099',
          position: 'absolute',
          width: BOARD_WIDTH * 0.98,
          height: BOARD_HEIGHT * 0.98,
          top: BOARD_HEIGHT * 0.07,
          left: BOARD_WIDTH * 0.01
        }}>
 
          {/* snapshot */}
          <ViewShot ref="viewShot" options={{ format: "png" }}>

            <View style={[styles.drawPane, {
              backgroundColor: '#abcabc44'
            }]}>
              { this.genImage(this.toolStore.drawItem) }
            </View>

            <RNSketchCanvas
              containerStyle={{ flex: 1, }}
              canvasStyle={{ flex: 1, }}
              defaultStrokeIndex={0}
              defaultStrokeWidth={6}
              
              strokeComponent={color => (
                <View style={[{ backgroundColor: color, opacity: 0.5 }, styles.strokeColorButton]} />
              )}
              strokeSelectedComponent={(color, index, changed) => {
                return (
                  <View style={[{ backgroundColor: color, opacity: 1 }, styles.strokeColorButton]} />
                )
              }}
              strokeWidthComponent={(w) => {
                return (
                  <Image style={{ width: 48, height: 48, marginLeft: 20 }} source={Plus}/>
                )
              }}
              undoComponent={
                <Image style={{ width: 48, height: 48, marginRight: 20 }} source={Reback}/>
              }
              clearComponent={
                <Image style={{ width: 48, height: 48 }} source={Redo}/>
              }
              eraseComponent={
                <Image style={{ width: 48, height: 48 }} source={Eraser}/>
              }>

            </RNSketchCanvas>

          </ViewShot>


          <TouchableOpacity 
            onPress={()=> {
              this.snapshot()
            }}
            style={{
              position: 'absolute',
              left: '46%',
            }}>
            <Image source={Camera} style={[styles.icon]}/>
            </TouchableOpacity>
        </View>


      </ImageBackground>	
		);
  }
  
  snapshot(){
    this.refs['viewShot'].capture().then(uri => {
      console.log("do something with ", uri);
    });
  }

  genImage(ele){
    return (
      <Image style={styles.drawPane} source={ele.image}></Image>
    )
  }
	getRight(){
    if(this.toolStore.open !== '') return -1 * (TOOL_PANE_WIDTH - BOARD_POS_BASIC)
    else {
      if(this.storyStore.isRecord) return (screenWidth/2) - (BOARD_WIDTH/2) // be center
      else return BOARD_POS_BASIC
    }
  }
}


const styles = StyleSheet.create({
	drawBoard: {
    width: BOARD_WIDTH,
    height: screenHeight,
    position: 'absolute',
    overflow: 'hidden',
  },
  

  drawPane: {
    height: 400,
    width: 400
  },

  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE
  },
	
  strokeColorButton: {
    marginHorizontal: 2.5, 
    marginVertical: 8, 
    width: 30, 
    height: 30, 
    borderRadius: 15,
    flexDirection: 'column'
  },

  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A', right: 575,
  },
});