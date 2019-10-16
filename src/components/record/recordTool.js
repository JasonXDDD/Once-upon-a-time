import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, requireNativeComponent, UIManager, findNodeHandle, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationActions } from "react-navigation";

import Btn_Recording_Stop from '../../assets/images/RecordStory/Btn_Recording_Stop.png'
import { observe } from 'mobx';

const SwiftRecordTool = requireNativeComponent('RecordTool')

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ICON_SIZE = 60;

@inject('rootStore')
@observer
export default class RecordTool extends Component {
  buttonPlayer;

  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
    this.soundStore = props.rootStore.soundStore
    this.navigation = props.navigation
  }

  start(){
    this.storyStore.count = 3
    this.storyStore.countdownid = setInterval(() => {this.countDown()}, 1000)
  }

  countDown(){ 
    if (this.storyStore.count == 0){
      clearInterval(this.storyStore.countdownid)

      this.storyStore.onLive = true
      this.onStartRecord()
    }
    else
      this.storyStore.count --;
  }

  componentDidMount(){
    this.buttonPlayer = this.soundStore.genMusic('button')
    observe(this.storyStore, 'isRecord',(change)=> {
      if(change.newValue)
        this.start()
    })
  }
  render() {
    return (
      <View style={[styles.storyTool, { display: !this.storyStore.isRecord ? "none" : "flex" }]}>
        <TouchableOpacity 
          onPress={() => {
            if(this.storyStore.onLive){
              this.onStopRecord()
              this.storyStore.onLive = false
              this.storyStore.isRecord = false;
              this.storyStore.selectMusic = '';
              this.showBar();
  
              this.soundStore.playSoundEffect(this.buttonPlayer, 1, 0)
              this.soundStore.playBGM(true)
            }
          }}>
          <Image style={styles.toolIcon} source={Btn_Recording_Stop}></Image>
        </TouchableOpacity>

        <SwiftRecordTool ref={e => this.swiftRecordToolRef = e} style={{display: 'none'}}/>
      </View>
    )
  }

  showBar() {
    const setParamsAction = NavigationActions.setParams({
      params: { showTabBar: true },
      key: this.navigation.state.key
    });

    this.navigation.dispatch(setParamsAction);
  }

  onStartRecord() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.swiftRecordToolRef),
      UIManager.getViewManagerConfig('RecordTool').Commands.startRecordFromManager,
      []
    );
  }

  onStopRecord() {
    console.log("Stopped")
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.swiftRecordToolRef),
      UIManager.getViewManagerConfig('RecordTool').Commands.stopRecordFromManager,
      []
    );
  }

}

const styles = StyleSheet.create({
  storyTool: {
    left: screenWidth / 2 - ICON_SIZE /2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },

  toolIcon: {
    marginTop: 25,
    width: ICON_SIZE / 50 * 80,
    height: ICON_SIZE,
    marginHorizontal: 5
  }
})
