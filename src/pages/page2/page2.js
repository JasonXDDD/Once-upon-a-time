import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  AppRegistry,
  View,
  Alert,
  ScrollView,
  Image,
  TextInput,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Switch,
  Picker,
  Slider,
  ART
 } from "react-native";
 import SvgUri from "react-native-svg-uri";
 import { captureRef, captureScreen } from "react-native-view-shot";

import NaviBar from '../../components/navi-bar'
import StickerToolBar from '../../components/stick/stickerToolBar'

import { inject, observer } from 'mobx-react'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import LookStory_BG from '../../assets/images/LookStory/BG.png'

import Redo from '../../assets/images/EditStory/btn_redo.png'
import Reback from '../../assets/images/DrawStory/btn_reback.png'
import Eraser from '../../assets/images/DrawStory/btn_eraser.png'
import Plus from '../../assets/images/DrawStory/btn_penPlus.png'
import Delet from '../../assets/images/LookStory/Btn_delete.png'
import Camera from '../../assets/images/DrawStory/btn_camera.png'

@inject('rootStore')
@observer
export default class Page2 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
    this.state = {
      empty: [],
      previewSource: null,
      error: null,
      res: null,
      value: {
        format: "png",
        quality: 0.9,
        result: "tmpfile",
        snapshotContentContainer: false
      }
    }
} 

clean() {
  const { empty } = this.state.empty;
  this.store.pushSticker(empty)
}


snapshot = refname => () =>
(refname
  ? captureRef(this.refs[refname], this.state.value)
  : captureScreen(this.state.value)
)
  .then(
    res =>
      this.state.value.result !== "tmpfile"
        ? res
        : new Promise((success, failure) =>
            // just a test to ensure res can be used in Image.getSize
            Image.getSize(
              res,
              (width, height) => (
                console.log(res, width, height), success(res)
              ),
              failure
            )
          )
  )
  .then(res =>
    this.setState({
      error: null,
      res,
      previewSource: {
        uri:
          this.state.value.result === "base64"
            ? "data:image/" + this.state.value.format + ";base64," + res
            : res
      }
    })
  )
  .catch(
    error => (
      console.warn(error),
      this.setState({ error, res: null, previewSource: null })
    )
  );



  render() {
    const { value, previewSource, error, res } = this.state;
    return (
      <ImageBackground source={LookStory_BG} style={{flex: 1}}>
        <NaviBar title={'畫故事'}/>
        <StickerToolBar />
        <View 
        style={{
          position: 'absolute',
          width: 801,
          height: 561,
          bottom: 54.5,
          right: this.store.rightDirection,
          backgroundColor: "#f6f6f6",
          overflow: 'hidden',
          borderRadius: 15,
          borderColor: "#f6f6f6",
          borderWidth: 10,
        }}>


          <View ref="svg" collapsable={false} style={{
              position: 'absolute',
              width: 404,
              height: 404,              
              borderRadius: 15,
              borderColor: "#000000",
              borderWidth: 2,
              left: 190,
              top: 60,
              borderStyle: 'dashed',
            }}>
              <View 
              style={{ 
                overflow: 'hidden',
                width: 400,
                height: 400,
               }}>
                {this.store.sticker}
              </View>
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
              return (<View style={styles.strokeWidthButton}>
            <Image
            style={{
              width: 48,
              height: 48,
            }}
            source={Plus}/>
              </View>
            )}}

            undoComponent={
            <Image
            style={{
              width: 48,
              height: 48,
              right: 20,
            }}
            source={Reback}/>}
            clearComponent={
            <Image
            style={{
              width: 48,
              height: 48,
            }}
            source={Redo}/>}
            eraseComponent={
            <Image
            style={{
              width: 48,
              height: 48,
            }}
            source={Eraser}/>}
        />

            <TouchableOpacity 
            onPress={this.snapshot("svg")}
            style={{
              position: 'absolute',
              left: '46%',
            }}>
            <Image
            source={Camera}
            style={{
              width: 54,
              height: 54,
            }}/>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => {this.clean()}} 
            style={{position: 'absolute', right:0, bottom:0,}}>
                <Image
                source={Delet}
                style={{
                    width: 54,
                    height: 54,
                }} />
            </TouchableOpacity>

        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
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