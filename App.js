import React, { Component } from "react";
import { Platform, Image, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import TabBar from "./src/components/tabBar";
import { SafeAreaView } from "react-navigation";
import { Provider, observer } from "mobx-react";
import { Provider as ProviderAntd } from "@ant-design/react-native";
import * as store from "./src/stores/index";
import Sound from 'react-native-sound';

@observer
export default class App extends Component<Props> {  

  constructor(props) {
    super(props)
  };

  componentDidMount(){
    setTimeout(() => {
      store.soundStore.playMusic(store.soundStore.bgmPlayer, 0.4, -1)
    }, 1000)
  }

  switchBGM(){
    if(store.soundStore.isBgm){
      store.soundStore.bgmPlayer.stop()
      store.soundStore.isBgm = false
    }

    else {
      store.soundStore.playMusic(store.soundStore.bgmPlayer, 0.4, -1)
      store.soundStore.isBgm = true
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
              <Text>{store.soundStore.isBgm? 'Close BGM': 'Open BGM'}</Text>
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