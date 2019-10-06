import React, { Component } from "react";
import { Platform, Image, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import TabBar from "./src/components/tabBar";
import { SafeAreaView } from "react-navigation";
import { Provider, observer } from "mobx-react";
import { Provider as ProviderAntd } from "@ant-design/react-native";
import * as store from "./src/stores/index";
import Sound from 'react-native-sound';
import { SiriShortcutsEvent, donateShortcut, suggestShortcuts, clearAllShortcuts, clearShortcutsWithIdentifiers, presentShortcut } from "react-native-siri-shortcut";
import AddToSiriButton, { SiriButtonStyles, supportsSiriButton } from "react-native-siri-shortcut/AddToSiriButton";


const opts1: ShortcutOptions = {
  activityType: "io.github.jasonxddd.sayHello",
  title: "從前從前說故事",
  description: "拉拉",
  userInfo: { say: 'story' },
  keywords: ["故事", "從前"],
  persistentIdentifier: "io.github.jasonxddd.sayHello",
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: "講故事給我聽",
  needsSave: true,
};


@observer
export default class App extends Component<Props> {  

  constructor(props) {
    super(props)
  };

  componentDidMount(){
    setTimeout(() => {
      store.soundStore.playMusic(store.soundStore.bgmPlayer, 0.4, -1)
    }, 1000)

    // set sirikit listener
    SiriShortcutsEvent.addListener("SiriShortcutListener", ({userInfo, activityType}) => {
      store.storyStore.shortcutInfo = JSON.stringify(userInfo)
      store.storyStore.shortcutActivityType = activityType
    });
    suggestShortcuts([opts1]);
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
          <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "never", bottom: "never" }}>
            <TabBar />
            <TouchableOpacity style={styles.bgmButton} onPress={() => {
              this.switchBGM()
            }}>
              <Text>{store.soundStore.isBgm? 'Close BGM': 'Open BGM'}</Text>
            </TouchableOpacity>

            {supportsSiriButton && (
              <AddToSiriButton
                style={styles.siriButton}
                buttonStyle={SiriButtonStyles.blackOutline}
                onPress={() => {
                  presentShortcut(opts1, ({ status }) => {
                    console.log(`I was ${status}`);
                  });
                }}
                shortcut={opts1}
              />
            )}

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

  siriButton: {
    position: "absolute",
    overflow: "hidden",
    bottom: 25,
    left: 5
  }
})