import React, { Component } from "react";
import { Platform, Image, Alert, TouchableOpacity, Modal, Text, StyleSheet, Dimensions } from "react-native";
import TabBar from "./src/components/tabBar";
import { SafeAreaView } from "react-navigation";
import { Provider, observer } from "mobx-react";
import { Provider as ProviderAntd } from "@ant-design/react-native";
import * as store from "./src/stores/index";
import Sound from 'react-native-sound';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';

import BGM_Open from "./src/assets/images/bgm-open.png";
import BGM_Close from "./src/assets/images/bgm-close.png";

const LaunchURL = "http://jasonxddd.nctu.me:8001/launch.mp4";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const ICON_SIZE = 60;
const BOARD_POS_BASIC = 25;
const BOARD_RIGHT = screenWidth / 2 - BOARD_WIDTH / 2;
const BOARD_TOP = screenHeight / 2 - BOARD_HEIGHT / 2 - screenHeight * 0.04;

@observer
export default class App extends Component<Props> {  
  bgmOpenPlayer;
  bgmClosePlayer;
	state = {
		modalVisible: true,
  };
  
  constructor(props) {
    super(props)
  };

  componentDidMount(){
    this.bgmOpenPlayer = store.soundStore.genMusic('bgm_open')
    this.bgmClosePlayer = store.soundStore.genMusic('bgm_close')
  }
  
  render() {
    return (
      <Provider rootStore={store}>
        <ProviderAntd>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "never", bottom: "never" }}>
            <TabBar />
            <TouchableOpacity style={[styles.bgmButton, {display: store.storyStore.isRecord? 'none': 'flex'}]} onPress={() => {
              store.soundStore.playSoundEffect(store.soundStore.isBgm? this.bgmClosePlayer:  this.bgmOpenPlayer, 0.5, 0)
              store.soundStore.playBGM(!store.soundStore.isBgm)
            }}>
              <Image source={store.soundStore.isBgm? BGM_Open: BGM_Close} style={styles.bgmImage}></Image>
            </TouchableOpacity>


            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}>
              
              <VideoPlayer
                disableFullscreen={true}
                disableBack={true}
                disablePlayPause={true}
                disableSeekbar={true}
                disableVolume={true}
                disableTimer={true}
                toggleResizeModeOnFullscreen={false}
                showOnStart={false}

                source={{ uri: LaunchURL }}
                onEnd={() => {
                  this.setState({modalVisible: false});

                  setTimeout(() => {
                    store.soundStore.playMusic(store.soundStore.bgmPlayer, 0.4, -1)
                  }, 500)
                }}/> 

            </Modal>

          </SafeAreaView>
        </ProviderAntd>
      </Provider>
    );
  }
}


console.disableYellowBox = true;

const styles = StyleSheet.create({
  bgmButton: {
    position: "absolute",
    overflow: "hidden",
    bottom: 40,
    right: BOARD_RIGHT - ICON_SIZE - 30
  },

  bgmImage: {
    width: ICON_SIZE,
    height: ICON_SIZE
  }
})