import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'

import Redo from '../../assets/images/EditStory/btn_redo.png'
import Save from '../../assets/images/EditStory/btn_save.png'

const ICON_SIZE = 48;
const BOARD_POS_BASIC = 25;

@inject('rootStore')
@observer
export default class StoryTool extends Component {
  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
  }

  render() {
    return (
      <View style={[ styles.storyTool, {display: this.storyStore.isRecord? 'none': 'flex'}]}>
        
        {/* clear board */}
        <TouchableOpacity onPress={() => { this.storyStore.storyScene[this.storyStore.selectSceneIndex].story = [] }}>
          <Image style={styles.toolIcon} source={Redo} />
        </TouchableOpacity>

        {/* save, no use */}
        {/*
          <TouchableOpacity>
          <Image style={styles.toolIcon} source={Save}/>
        </TouchableOpacity>
        */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  storyTool: {
    top: BOARD_POS_BASIC + 20,
    right: BOARD_POS_BASIC + 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  toolIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  }
})
