import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { inject, observer } from 'mobx-react'

import EditStory_BG from '../assets/images/EditStory/BG.png'
import Redo from '../assets/images/EditStory/btn_redo.png'
import Save from '../assets/images/EditStory/btn_save.png'
import Teaching from '../assets/images/EditStory/Teaching.png'

import ToolBar from '../components/toolBar'
import { observable } from 'mobx'
import StoryBoard from '../components/story/storyBoard'
import StoryTool from '../components/story/storyTool'
import StoryToolRecord from '../components/story/storyToolRecord'
import GoBack from '../components/record/goBack'
import RecordTool from '../components/record/recordTool'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

@inject('rootStore')
@observer
export default class EditStory extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ImageBackground source={EditStory_BG} style={{ flex: 1 }}>
				
				
				<ToolBar />
        <GoBack navigation={this.props.navigation}></GoBack>

				{/* draw board */}
				<StoryBoard />
				
        <StoryTool />
				<StoryToolRecord navigation={this.props.navigation} />
				
        <RecordTool navigation={this.props.navigation}></RecordTool>

      </ImageBackground>
    )
  }
}
