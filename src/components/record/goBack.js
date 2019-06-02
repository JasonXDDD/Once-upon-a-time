import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'

import Redo from '../../assets/images/EditStory/btn_redo.png'
@inject('rootStore')
@observer
export default class GoBack extends Component {
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
          <Image style={styles.toolIcon} source={Redo} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  storyTool: {
    top: 20 + 20,
    left: 5,
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
