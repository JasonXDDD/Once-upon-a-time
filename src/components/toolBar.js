import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import * as Animatable from 'react-native-animatable';
import { RES } from "../core/resource";
import { VAR } from "../core/variable";

import ToolItem from "./toolItem";

@inject("rootStore")
@observer
export default class ToolBar extends Component {

  toolPlayer;

  toolList = [
    {
      type: "scene",
      color: "#f68a50",
      top: (VAR.TOOL_PANE_ICON_SIZE + 10) * 0 + VAR.TOOL_PANE_OFFSET,
      animated: false
    },

    {
      type: "character",
      color: "#fec64c",
      top: (VAR.TOOL_PANE_ICON_SIZE + 10) * 1 + VAR.TOOL_PANE_OFFSET,
      animated: false
    },

    {
      type: "sticker",
      color: "#3e97a5",
      top: (VAR.TOOL_PANE_ICON_SIZE + 10) * 2 + VAR.TOOL_PANE_OFFSET,
      animated: false
    },

    {
      type: "music",
      color: "#4078b2",
      top: (VAR.TOOL_PANE_ICON_SIZE + 10) * 3 + VAR.TOOL_PANE_OFFSET,
      animated: false
    }
  ];

  constructor(props) {
    super(props);
    this.toolStore = props.rootStore.toolStore;
    this.storyStore = props.rootStore.storyStore;
    this.soundStore = props.rootStore.soundStore;
  }

  componentWillMount(){
    this.toolPlayer = this.soundStore.genMusic('tool')
  }

  render() {
    return (
      <View style={[ styles.container,
        { display: this.storyStore.isRecord ? "none" : "flex" }
      ]} >
        
        {this.toolList.map((ele, index) => {
          return (
            <View key={ele.type}>
              {/* tool pane */}
              <View
                style={[
                  styles.toolPane,
                  {
                    backgroundColor: ele.color,
                    left: this.toolStore.open !== "" ? 0 : -1 * VAR.TOOL_PANE_WIDTH,
                    display: this.toolStore.open === ele.type ? "flex" : "none"
                  }
                ]}
              >
                <Image style={{width: VAR.TOOL_PANE_WIDTH, height: VAR.TOOL_PANE_OFFSET}} source={RES.ToolBar_Tap}></Image>                
                <ToolItem select={this.props.select} type={ele.type} />
              </View>

              {/* tool icon */}
              <TouchableOpacity
                onPress={() => {
                  this.soundStore.playSoundEffect(this.toolPlayer, 3, 0)
                  this.toolStore.toggleOpen(ele.type);
                  this.toolStore.isAnimate[index] = true
                  if(this.toolStore.selectIndex === index) 
                    this.toolStore.selectIndex = -1
                  else this.toolStore.selectIndex = index
                }}
                style={[
                  styles.toolIcon,
                  {
                    top: this.toolStore.selectIndex < index && this.toolStore.selectIndex != -1 ? ele.top + 10: ele.top,
                    left: this.toolStore.open !== "" ? VAR.TOOL_PANE_WIDTH : 0
                  }
                ]}
              >
                <Animatable.Image
                  animation={this.toolStore.isAnimate[index]? "rubberBand": ""}
                  duration={700}
                  onAnimationEnd={() => {
                    this.toolStore.isAnimate[index] = false
                  }}
                  source={this.toolStore[ele.type + "Btn"]}
                  style={this.toolStore.open === ele.type? styles.selectIcon: styles.icon}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: VAR.TOOL_PANE_WIDTH,
    flexDirection: "row",
    // justifyContent: "flex-start",
    // textAlign: "center"
  },

  icon: {
    position: "relative",
    width: VAR.TOOL_PANE_ICON_SIZE,
    height: VAR.TOOL_PANE_ICON_SIZE
  },

  selectIcon: {
    position: "relative",
    width: VAR.TOOL_PANE_ICON_SIZE * 1.2,
    height: VAR.TOOL_PANE_ICON_SIZE * 1.2
  },

  toolPane: {
    position: "absolute",
    width: VAR.TOOL_PANE_WIDTH,
    height: VAR.SCREEN_HEIGHT
  },

  toolIcon: {
    textAlign: "center",
    position: "absolute",
    left: 0,
  }
});
