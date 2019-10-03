import React, { Component } from "react";
import { Platform, Image, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import TabBar from "./src/components/tabBar";
import { SafeAreaView } from "react-navigation";
import { Provider, observer } from "mobx-react";
import { Provider as ProviderAntd } from "@ant-design/react-native";
import * as store from "./src/stores/index";
import Sound from 'react-native-sound';

const bgmPlayer = store.soundStore.genMusic('bgm')

@observer
export default class App extends Component<Props> {  
  state = {
    isBgm: true
  }

  constructor(props) {
    super(props)
  };

  componentDidMount(){
    setTimeout(() => {
      store.soundStore.playMusic(bgmPlayer, 0.4, -1)
    }, 1000)
  }

  switchBGM(){
    if(this.state.isBgm){
      bgmPlayer.stop()
      this.setState({isBgm: false})
    }

    else {
      store.soundStore.playMusic(bgmPlayer, 0.4, -1)
      this.setState({isBgm: true})
    }
  }
  
  render() {
    return (
      <Provider rootStore={store}>
        <ProviderAntd>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always", bottom: "always" }}>
            <TabBar />
            <TouchableOpacity style={styles.bgmButton} onPress={() => {
              this.switchBGM()
            }}>
              <Text>{this.state.isBgm? 'Close BGM': 'Open BGM'}</Text>
            </TouchableOpacity>
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
    top: 50,
    right: 50
  },
})