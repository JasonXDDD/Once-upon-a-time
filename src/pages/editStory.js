import React, { Component } from 'react'
import { Platform, ImageBackground, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'

import EditStory_BG from '../assets/images/EditStory/BG.png'
import Redo from '../assets/images/EditStory/btn_redo.png'
import Save from '../assets/images/EditStory/btn_save.png'
import Teaching from '../assets/images/EditStory/Teaching.png'

import ToolBar from '../components/toolBar'
import StoryBoard from '../components/story/storyBoard'
import StoryTool from '../components/story/storyTool'
import StoryToolRecord from '../components/story/storyToolRecord'
import GoBack from '../components/record/goBack'
import RecordTool from '../components/record/recordTool'
import SceneTool from '../components/scene/sceneTool';

@inject('rootStore')
@observer
export default class EditStory extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ImageBackground source={EditStory_BG} style={{ flex: 1 }}>
        {/* draw board and tool */}
        <ToolBar />
        <StoryBoard />

        {/* scene tool */}
        <SceneTool />

        {/* when edit */}
        <StoryTool />
        <StoryToolRecord navigation={this.props.navigation} />

        {/* when record */}
        <GoBack navigation={this.props.navigation} />
        <RecordTool navigation={this.props.navigation} />    
      </ImageBackground>
    )
  }
}
