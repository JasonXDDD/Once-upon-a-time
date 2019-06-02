import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'

import Btn_Recording from '../../assets/images/RecordStory/Btn_Recording.png'

@inject('rootStore')
@observer
export default class RecordTool extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.storyStore
    this.navigation = props.navigation
  }

  render() {
    return (
      <View style={styles.storyTool}>
        <TouchableOpacity onPress={() => { 
          this.store.isRecord = false;
          this.navigation.navigate('EditStory')
        }}>
          <Image style={styles.toolIcon} source={Btn_Recording} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  storyTool: {
    top: 20 + 20,
    right: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    width: 58,
    height: 48
  },

  toolIcon: {
    width: 48,
    height: 48,
    marginHorizontal: 5
  }
})
