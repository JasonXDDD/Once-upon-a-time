
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ImageBackground} from 'react-native';
import { inject, observer } from "mobx-react"

import ToolBar from '../components/toolBar'
import DrawBoard from '../components/draw/drawboard'

import DrawStory_BG from '../assets/images/DrawStory/BG.png'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const BOARD_WIDTH = screenWidth * 0.76;
const BOARD_HEIGHT = screenHeight * 0.7;
const BOARD_POS_BASIC = 25;
const TOOL_PANE_WIDTH = 135;

@inject('rootStore')
@observer
export default class DrawSticker extends Component {
	constructor(props){
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
	}
	
	render() {
		return (
			<ImageBackground source={DrawStory_BG} style={{flex: 1}}>
				<ToolBar select="draw"/>
				<DrawBoard />

				
			</ImageBackground>
		);
	}
}


const styles = StyleSheet.create({
	
});