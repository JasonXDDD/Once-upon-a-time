import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { SiriShortcutsEvent, donateShortcut, suggestShortcuts, clearAllShortcuts, clearShortcutsWithIdentifiers, presentShortcut } from "react-native-siri-shortcut";
import AddToSiriButton, { SiriButtonStyles, supportsSiriButton } from "react-native-siri-shortcut/AddToSiriButton";

import Btn_Share from '../../assets/images/StoryBox/Btn_share.png'
import Btn_Delete from '../../assets/images/StoryBox/Btn_delete.png'
import Btn_Reload from '../../assets/images/StoryBox/Btn_reload.png'

const ICON_SIZE = 70;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const shareOptions = {
  title: '分享',
  message: '',
  url: 'some share url',
  social: Share.Social.EMAIL
};


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

@inject('rootStore')
@observer
export default class BoxTool extends Component {
  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
    this.navigation = props.navigation
  }

  componentDidMount(){
    // set sirikit listener
    SiriShortcutsEvent.addListener("SiriShortcutListener", ({userInfo, activityType}) => {
      this.storyStore.shortcutInfo = JSON.stringify(userInfo)
      this.storyStore.shortcutActivityType = activityType
    });
    suggestShortcuts([opts1]);
  }

  deleteVideo(path){
    return RNFS.unlink(path)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    });
  }

  render() {
    return (
      <View style={[styles.recordTool]}>
        <Text style={styles.selectText}>選擇： {this.props.selectVideo.time}</Text>

        {supportsSiriButton && (
          <AddToSiriButton
            style={styles.siriButton}
            buttonStyle={SiriButtonStyles.whiteOutline}
            onPress={() => {
              presentShortcut(opts1, ({ status }) => {
                console.log(`I was ${status}`);
              });
            }}
            shortcut={opts1}
          />
        )}

        <TouchableOpacity 
          onPress={() => {
            this.deleteVideo(this.props.selectVideo.video)
          }}>
          <Image style={styles.recordIcon} source={Btn_Delete}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Share.open({
              url: "file://" + this.props.selectVideo.video,
              type: 'video/mp4',
              message: "大家好，這是我做的新故事喔！"
            })
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
          }}>
          <Image style={styles.recordIcon} source={Btn_Share}></Image>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            this.deleteVideo(this.props.selectVideo.video)
          }}>
          <Image style={styles.recordIcon} source={Btn_Reload}></Image>
        </TouchableOpacity>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  recordIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginHorizontal: 10
  },

  recordTool: {
    position: 'absolute',
    right: (screenWidth - (ICON_SIZE + 20) * 2) /2,
    bottom: screenHeight * 0.2,
    flexDirection: 'row'
  },

  selectText: {
    position: 'absolute',
    marginTop: -35,
    marginLeft: -50,
    fontSize: 20
  },


  siriButton: {
    marginTop: 10,
    marginHorizontal: 10
  }
})