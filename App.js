import React, { Component } from "react";
import { Platform, Image, Alert, TouchableOpacity, Text } from "react-native";
import TabBar from "./src/components/tabBar";
import { SafeAreaView } from "react-navigation";
import { Provider, observer } from "mobx-react";
import { Provider as ProviderAntd } from "@ant-design/react-native";
import * as store from "./src/stores/index";
import Sound from 'react-native-sound';

const bgmPlayer = store.soundStore.genMusic('bgm')

@observer
export default class App extends Component<Props> {  

  constructor(props) {
    super(props)
  };

  componentDidMount(){
    setTimeout(() => {
      store.soundStore.playMusic(bgmPlayer, 0.4, -1)
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
