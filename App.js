import React, { Component } from "react";
import { Platform, Image, Alert, TouchableOpacity, Text } from "react-native";
import TabBar from "./src/components/tabBar";
import { SafeAreaView } from "react-navigation";
import { Provider, observer } from "mobx-react";
import { Provider as ProviderAntd } from "@ant-design/react-native";
import * as store from "./src/stores/index";
import Sound from 'react-native-sound';


import backGroundMusic from "./src/assets/sound/Rainbow_Forest.mp3"
const bgmPlayer = new Sound(backGroundMusic, (error)=> {
  if(error) Alert.alert("失敗")
})

@observer
export default class App extends Component<Props> {  

  constructor(props) {
    super(props)
  };

  componentDidMount(){
    this.playBGM()
  }

  playBGM(){
    setTimeout(() => {
      bgmPlayer.setVolume(0.5);
      bgmPlayer.setNumberOfLoops(-1);
      bgmPlayer.play((success) => {
        console.log("play")
        console.log(success)
      })
    }, 1000)
  }
  
  render() {
    return (
      <Provider rootStore={store}>
        <ProviderAntd>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always", bottom: "always" }}>
            <TabBar />
          </SafeAreaView>
        </ProviderAntd>
      </Provider>
    );
  }
}


console.disableYellowBox = true;
