import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, requireNativeComponent, UIManager, findNodeHandle } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationActions } from "react-navigation";

import Btn_Recording from '../../assets/images/RecordStory/Btn_Recording.png'
import Btn_Start from '../../assets/images/RecordStory/Btn_Start.png'
import Btn_Stop from '../../assets/images/RecordStory/Btn_Stop.png'
import { observe } from 'mobx';

const SwiftRecordTool = requireNativeComponent('RecordTool')
const ICON_SIZE = 50;

@inject('rootStore')
@observer
export default class RecordTool extends Component {
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
    observe(this.storyStore, 'isRecord',(change)=> {
      if(change.newValue)
        this.start()
    })
  }
  render() {
    return (
      <View style={[styles.recordTool, { display: !this.storyStore.isRecord ? "none" : "flex" }]}>
        <TouchableOpacity style={{display: this.storyStore.onLive === false? 'flex': 'none'}}>
          <Image style={styles.recordIcon} source={Btn_Start}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{display: this.storyStore.onLive === true? 'flex': 'none'}} 
          onPress={() => {
            this.onStopRecord()
            this.storyStore.onLive = false
            this.storyStore.isRecord = false;
            this.showBar();

            this.soundStore.playMusic(this.soundStore.bgmPlayer, 0.4, -1)
            this.soundStore.isBgm = true
          }}>
          <Image style={styles.recordIcon} source={Btn_Stop}></Image>
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
  recordIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },

  recordTool: {
    position: 'absolute',
    right: 50,
    top: 80
  }
})
