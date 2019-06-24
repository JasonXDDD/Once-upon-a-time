import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'

import Save from '../../assets/images/EditStory/btn_save.png'
import BG_Scene from '../../assets/images/EditStory/BG_ScenesBar.png'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const BOARD_WIDTH = screenWidth * 0.9;
const BOARD_HEIGHT = screenHeight * 0.8;
const ICON_SIZE = 48;
const BOARD_POS_BASIC = 25;

@inject('rootStore')
@observer
export default class SceneTool extends Component {

  constructor(props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
  }

  render() {
    return (
      <View style={[ styles.sceneTool, {display: this.storyStore.isRecord? 'none': 'flex'}]}>
        
        {/* scene board */}
        <TouchableOpacity onPress={() => { this.storyStore.openScenePane = !this.storyStore.openScenePane; }}>
          <Image style={styles.toolIcon} source={Save} />
        </TouchableOpacity>

        <View style={[styles.scenePane, {display: this.storyStore.openScenePane? 'flex': 'none'}]}>
        
          <ImageBackground source={BG_Scene} style={[styles.sceneBar]}>
          {         
            this.storyStore.storyScene.map((ele, id) => {
              return (
                <TouchableOpacity key={id} style={{marginHorizontal: 10}} onPress={() => { this.storyStore.selectSceneIndex = id }}>
                  <Image style={styles.toolIcon} source={Save} />
                  <Text style={styles.toolNumber}>{id+1}</Text>
                </TouchableOpacity>
              )
            })
          }
          </ImageBackground>
        
          <TouchableOpacity onPress={() => {  }}>
            <Image style={styles.toolIcon} source={Save} />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  sceneTool: {
    top: BOARD_POS_BASIC + BOARD_HEIGHT - ICON_SIZE - 20,
    right: BOARD_POS_BASIC + BOARD_WIDTH - ICON_SIZE - 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  scenePane: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  sceneBar: {
    width: BOARD_WIDTH - BOARD_POS_BASIC - (ICON_SIZE*2) - 20 - 20,
    height: ICON_SIZE + 10,
    marginHorizontal: 10,
    paddingHorizontal: 100,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },

  toolIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  toolNumber: {
    position: 'absolute',
    top: ICON_SIZE/2 - 20,
    right: ICON_SIZE/2 - 10,
    fontSize: 30,
  }
})