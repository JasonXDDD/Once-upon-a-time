import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Dimensions, ImageBackground } from "react-native";
import { inject, observer } from "mobx-react";
import { RES } from "../core/resource";

import ToolBar from "../components/toolBar";
import DrawBoard from "../components/draw/drawboard";


@inject("rootStore")
@observer
export default class DrawSticker extends Component {
  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
  }

  render() {
    return (
      <ImageBackground source={RES.DrawStory_BG} style={{ flex: 1 }}>
        <DrawBoard />
        <ToolBar select="draw" />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
