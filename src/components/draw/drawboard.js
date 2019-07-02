
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'
import { inject, observer } from "mobx-react"
import DialogInput from 'react-native-dialog-input'

import DrawBoard_IMG from '../../assets/images/DrawStory/drawBoard.png'
import Redo from '../../assets/images/EditStory/btn_redo.png'
import Reback from '../../assets/images/DrawStory/btn_reback.png'
import Eraser from '../../assets/images/DrawStory/btn_eraser.png'
import Plus from '../../assets/images/DrawStory/btn_penPlus.png'
import Delete from '../../assets/images/LookStory/Btn_delete.png'
import Camera from '../../assets/images/DrawStory/btn_camera.png'
import ViewShot from 'react-native-view-shot';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const BOARD_POS_BASIC = 25;
const TOOL_PANE_WIDTH = 135;
const ICON_SIZE = 48;


const DRAW_BOARD_WIDTH = BOARD_WIDTH * 0.98;
const DRAW_BOARD_HEIGHT = BOARD_HEIGHT * 0.98;
const DRAW_PANE_SIZE = 400;



@inject('rootStore')
@observer
export default class DrawBoard extends Component {
  colorList = [
    { color: '#FF75B5' },
    { color: '#FF403F' },
    { color: '#FF7D1C' },
    { color: '#FFFF57' },
    { color: '#49C37C' },
    { color: '#6BCCF7' },
    { color: '#2367C0' },
    { color: '#9323A1' },
    { color: '#FFD298' },
    { color: '#84574F' },
    { color: '#FFFFFF' },
    { color: '#000000' }
  ]
  
  state = {
    isDialogVisible: false
  }

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
          position: 'absolute',
          width: DRAW_BOARD_WIDTH,
          height: DRAW_BOARD_HEIGHT,
          top: BOARD_HEIGHT * 0.07,
          left: BOARD_WIDTH * 0.01
        }}>

          {/* pane style */}
          <View style={[styles.drawPane, {
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
            top: ICON_SIZE
          }]}>
          </View>


          {/* snapshot */}
          <ViewShot ref="viewShot" options={{ format: "png" }}>

            {/* import image */}
            <View style={[styles.drawPane, {
              position: 'absolute',
              left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
              top: ICON_SIZE

            }]}>
              { this.genImage(this.toolStore.drawItem) }
            </View>

            {/* target */}
            <View style={[styles.drawPane, {
              marginTop: ICON_SIZE,
              marginLeft: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2,
            }]}></View>
            

            <RNSketchCanvas
              containerStyle={{ 
                position: 'absolute',
                width: DRAW_BOARD_WIDTH,
                height: DRAW_BOARD_HEIGHT,
                padding: 10
              }}
              canvasStyle={[styles.drawPane, { 
                backgroundColor: '#00000066',
                left: (DRAW_BOARD_WIDTH - DRAW_PANE_SIZE) / 2 - 10,
                top: 38,
                marginBottom: 100
              }]}
              defaultStrokeIndex={0}
              defaultStrokeWidth={6}
              strokeColors={this.colorList}
              
              strokeComponent={color => (
                <View style={[{ backgroundColor: color, opacity: 0.5 }, styles.strokeColorButton]} />
              )}
              strokeSelectedComponent={(color, index, changed) => {
                return (
                  <View style={[{ backgroundColor: color, opacity: 1 }, styles.strokeColorButton]} />
                )
              }}
              
              undoComponent={
                <Image style={[ styles.icon, { position: 'absolute', right: DRAW_BOARD_WIDTH * 0.07, top: 60 }]} source={Reback}/>
              }
              clearComponent={
                <Image style={[ styles.icon, { position: 'absolute', right: DRAW_BOARD_WIDTH * 0.07, top: 120 }]} source={Redo}/>
              }
              eraseComponent={
                <Image style={[ styles.icon, { position: 'absolute', left: DRAW_BOARD_WIDTH * 0.07, top: 60 }]} source={Eraser}/>
              }
              strokeWidthComponent={(w) => {
                return (
                  <Image style={[ styles.icon, { position: 'absolute', left: DRAW_BOARD_WIDTH * -0.9, top: 120 }]} source={Plus}/>
                )
              }}>
              

            </RNSketchCanvas>

          </ViewShot>


          <TouchableOpacity 
            onPress={()=> {
              this.setState({isDialogVisible: true})  
            }}
            style={{
              position: 'absolute',
              left: '46%',
            }}>
            <Image source={Camera} style={[styles.icon]}/>
            </TouchableOpacity>
        </View>

        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"他叫什麼名字？"}
          message={"請給他一個名字吧"}
          hintInput ={"名字"}
          submitInput={ (inputText) => {
            this.snapshot(inputText)
            this.setState({isDialogVisible: false})
          }}
          closeDialog={ () => {
            this.setState({isDialogVisible: false})            
          }}>
        </DialogInput>


      </ImageBackground>	
		);
  }
  
  snapshot(name){
    this.refs['viewShot'].capture().then(uri => {
      this.toolStore.sticker.push({
        id: name,
        image: JSON.stringify({
          uri: uri, 
          width: DRAW_PANE_SIZE, 
          height: DRAW_PANE_SIZE
        })
      })

      this.toolStore.open = 'sticker'
    });
  }

  genImage(ele){
    if(ele.image){
      return (
        <Image style={styles.drawPane} source={JSON.parse(ele.image)}></Image>
      )
    }
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