import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'

import Redo from '../../assets/images/EditStory/btn_redo.png'
import Save from '../../assets/images/EditStory/btn_save.png'
@inject('rootStore')
@observer
export default class StoryTool extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.storyStore
  }

  render() {
    return (
      <View style={styles.storyTool}>
        <TouchableOpacity onPress={() => { this.store.story = [] }}>
          <Image style={styles.toolIcon} source={Redo} />
        </TouchableOpacity>

        <TouchableOpacity 
        // onPress={() => {
        //   this.store.positionCanvas(this.state.parentCopy)
        // }}
        >
          <Image style={styles.toolIcon} source={Save}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  storyTool: {
    top: 20 + 20,
    right: 20 + 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    width: 48 + 48 + 5 * 4,
    height: 48
  },

  toolIcon: {
    width: 48,
    height: 48,
    marginHorizontal: 5
  }
})
