import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { inject, observer } from 'mobx-react'
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { SiriShortcutsEvent, donateShortcut, suggestShortcuts, clearAllShortcuts, clearShortcutsWithIdentifiers, presentShortcut } from "react-native-siri-shortcut";
import AddToSiriButton, { SiriButtonStyles, supportsSiriButton } from "react-native-siri-shortcut/AddToSiriButton";
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";

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
    this.boxStore = props.rootStore.boxStore
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
        <Text style={styles.selectText}>
          {this.boxStore.selectVideoIndex + 1} / {this.boxStore.videoList.length}
        </Text>

        {supportsSiriButton && (
          <ImageBackground source={RES.Btn_Siri} style={ styles.siriButton }>
            <AddToSiriButton
              style={{
                marginVertical: 4,
              }}
              buttonStyle={SiriButtonStyles.white}
              onPress={() => {
                presentShortcut(opts1, ({ status }) => {
                  console.log(`I was ${status}`);
                });
              }}
              shortcut={opts1}
            />
          </ImageBackground>
        )}

        <TouchableOpacity 
          onPress={() => {
            if(this.boxStore.selectVideoIndex != 0)
              this.deleteVideo(this.boxStore.selectVideo.video)
          }}>
          <Image style={styles.recordIcon} source={RES.Btn_Delete}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Share.open({
              url: "file://" + this.boxStore.selectVideo.video,
              type: 'video/mp4',
              message: "大家好，這是我做的新故事喔！"
            })
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
          }}>
          <Image style={styles.recordIcon} source={RES.Btn_Share}></Image>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            this.boxStore.getVideo()
          }}>
          <Image style={styles.recordIcon} source={RES.Btn_Reload}></Image>
        </TouchableOpacity>

      </View>
    )
  }

}

const styles = StyleSheet.create({

  recordIcon: {
    width: VAR.BOX_ICON_SIZE,
    height: VAR.BOX_ICON_SIZE,
    marginHorizontal: 10
  },

  recordTool: {
    position: 'absolute',
    width: VAR.SCREEN_WIDTH,
    bottom: VAR.SCREEN_HEIGHT * 0.22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  siriButton: {
    marginHorizontal: 10,
    height: (VAR.BOX_ICON_SIZE - 7),
    width: (VAR.BOX_ICON_SIZE - 7) * 233 / 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },

  selectText: {
    position: 'absolute',
    top: -40,
    right: ( VAR.SCREEN_WIDTH - 80 ) / 2,
    fontSize: 20
  }


})