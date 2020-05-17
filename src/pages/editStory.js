import React, { Component } from 'react'
import {
  Platform,
  ImageBackground,
  Dimensions,
  Text,
  StyleSheet,
  View
} from 'react-native'
import { observe } from 'mobx'
import { inject, observer } from 'mobx-react'
import { RES } from '../core/resource'
import { VAR } from '../core/variable'

import ToolBar from '../components/toolBar'
import StoryBoard from '../components/story/storyBoard'
import StoryTool from '../components/story/storyTool'
import StoryToolRecord from '../components/story/storyToolRecord'
import GoBack from '../components/record/goBack'
import RecordTool from '../components/record/recordTool'
import SceneTool from '../components/scene/sceneTool'
import MusicBoard from '../components/record/musicBoard'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const COUNT_WIDTH = 160;
const COUNT_HEIGHT = 240;
const COUNT_RIGHT = screenWidth / 2 - COUNT_WIDTH / 2;
const COUNT_TOP = screenHeight / 2 - COUNT_HEIGHT / 2 - screenHeight * 0.06;

@inject("rootStore")
@observer
export default class EditStory extends React.Component {
  constructor (props) {
    super(props)
    this.storyStore = props.rootStore.storyStore
  }

  componentDidMount () {
    //set when siri change route
    observe(this.storyStore, 'shortcutInfo', change => {
      if (JSON.parse(change.newValue).say === 'story')
        this.props.navigation.navigate('StoryBox')
    })
  }
  render () {
    return (
      <ImageBackground
        source={
          this.storyStore.isRecord ? RES.RecordStory_BG : RES.EditStory_BG
        }
        style={{ flex: 1 }}
      >
        {/* draw board and tool */}
        <StoryBoard />
        <ToolBar select='edit' />

        {/* scene tool */}
        <SceneTool />

        {/* when edit */}
        <StoryTool />
        <StoryToolRecord navigation={this.props.navigation} />

        {/* when record */}
        <MusicBoard />
        <RecordTool navigation={this.props.navigation} />

        <Text
          style={[
            styles.countText,
            { display: this.storyStore.count == 0 ? 'none' : 'flex' }
          ]}
        >
          {this.storyStore.count}
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  countText: {
    fontSize: 200,
    position: 'absolute',
    top: VAR.COUNT_TOP,
    right: VAR.COUNT_RIGHT,
    width: 200
  }
})
