import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'

import Btn_Recording from '../../assets/images/RecordStory/Btn_Recording.png'
@inject('rootStore')
@observer
export default class StoryToolRecord extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.storyStore
  }

  render() {
    return (
      <View style={styles.storyTool}>
        <TouchableOpacity 
        // onPress={() => {
        //   this.store.positionCanvas(this.state.parentCopy)
        // }}
        >
          <Image style={styles.toolIcon} source={Btn_Recording}/>
        </TouchableOpacity>
      </View>
    )
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.flatten({
  storyTool: {
    top: 10,
    left: (width/2) - 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 48
  },

  toolIcon: {
    width: 48,
    height: 48,
    marginHorizontal: 5
  }
})
