
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { inject, observer } from 'mobx-react'

import EditStory_BG from '../assets/images/EditStory/BG.png'
import Redo from '../assets/images/EditStory/btn_redo.png'
import Save from '../assets/images/EditStory/btn_save.png'
import Teaching from '../assets/images/EditStory/Teaching.png'

import ToolBar from '../components/toolBar';
import { observable } from 'mobx';
import StoryBoard from '../components/story/storyBoard';
import StoryTool from '../components/story/storyTool';
import StoryToolRecord from '../components/story/storyToolRecord';
import GoBack from '../components/record/goBack';
import RecordTool from '../components/record/recordTool';

@inject('rootStore')
@observer
export default class RecordStory extends React.Component {

	constructor(props) {
    super(props)
  }
	render() {
		return (
      <ImageBackground source={EditStory_BG} style={{ flex: 1 }}>
        <GoBack navigation={this.props.navigation}></GoBack>
        <StoryBoard></StoryBoard>
        <RecordTool navigation={this.props.navigation}></RecordTool>
			</ImageBackground>
		);
	}
}