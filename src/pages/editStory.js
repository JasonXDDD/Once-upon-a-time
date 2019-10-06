import React, { Component } from "react";
import { Platform, ImageBackground, Dimensions, Text, StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";

import EditStory_BG from "../assets/images/EditStory/BG.png";
import RecordStory_BG from "../assets/images/RecordStory/BG.png";
import Redo from "../assets/images/EditStory/btn_redo.png";
import Teaching from "../assets/images/EditStory/Teaching.png";

import ToolBar from "../components/toolBar";
import StoryBoard from "../components/story/storyBoard";
import StoryTool from "../components/story/storyTool";
import StoryToolRecord from "../components/story/storyToolRecord";
import GoBack from "../components/record/goBack";
import RecordTool from "../components/record/recordTool";
import SceneTool from "../components/scene/sceneTool";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const COUNT_WIDTH = 160;
const COUNT_HEIGHT = 240;
const COUNT_RIGHT = screenWidth / 2 - COUNT_WIDTH / 2;
const COUNT_TOP = screenHeight / 2 - COUNT_HEIGHT / 2 - screenHeight * 0.06;

@inject("rootStore")
@observer
export default class EditStory extends React.Component {
  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
  }

  render() {
    return (
      <ImageBackground
        source={this.storyStore.isRecord ? RecordStory_BG : EditStory_BG}
        style={{ flex: 1 }}
      >
        {/* draw board and tool */}
        <StoryBoard />
        <ToolBar select="edit" />

        {/* scene tool */}
        <SceneTool />

        {/* when edit */}
        <StoryTool />
        <StoryToolRecord navigation={this.props.navigation} />

        {/* when record */}
        <RecordTool navigation={this.props.navigation} />

        <Text style={[styles.countText, { display: this.storyStore.count == 0? 'none': 'flex' }]}>{this.storyStore.count}</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  countText: {
    fontSize: 200, 
    position: 'absolute', 
    top: COUNT_TOP, 
    right: COUNT_RIGHT
  }
});