
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { inject, observer } from 'mobx-react'

import EditStory_BG from '../assets/images/EditStory/BG.png'
import Redo from '../assets/images/EditStory/btn_redo.png'
import Save from '../assets/images/EditStory/btn_save.png'
import Teaching from '../assets/images/EditStory/Teaching.png'
import ToolBar from '../components/toolBar';
import { observable } from 'mobx';

@inject('rootStore')
@observer
export default class EditStory extends React.Component {

	constructor(props) {
    super(props)
    this.store = props.rootStore.toolStore
  }
	render() {
		return (
			<ImageBackground source={EditStory_BG} style={{ flex: 1 }}>
				<ToolBar></ToolBar>
				
				<Text>! {this.store.open}</Text>
			</ImageBackground>
		);
	}
}