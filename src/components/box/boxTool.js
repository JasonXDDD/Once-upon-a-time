import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'
import Share from 'react-native-share';

import Btn_Share from '../../assets/images/StoryBox/Btn_share.png'
import Btn_Delete from '../../assets/images/StoryBox/Btn_delete.png'

const ICON_SIZE = 70;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const shareOptions = {
  title: '分享',
  message: '',
  url: 'some share url',
  social: Share.Social.EMAIL
};

@inject('rootStore')
@observer
export default class BoxTool extends Component {
  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
    this.navigation = props.navigation
  }

  render() {
    return (
      <View style={[styles.recordTool]}>
        <Text style={styles.selectText}>選擇： {this.props.selectVideo.time}</Text>

        <TouchableOpacity 
          onPress={() => {
          }}>
          <Image style={styles.recordIcon} source={Btn_Delete}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Share.open()
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
          }}>
          <Image style={styles.recordIcon} source={Btn_Share}></Image>
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
  }
})