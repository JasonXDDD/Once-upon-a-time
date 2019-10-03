import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import ToolItem from "./toolItem";

import ToolBar_Tap from "../assets/images/img_Topmenu.png";

const TOOL_PANE_WIDTH = 135;
const TOOL_PANE_OFFSET = 25;
const ICON_SIZE = 60;
@inject("rootStore")
@observer
export default class ToolBar extends Component {

  toolPlayer;
  state = {
    selectIndex: -1
  }

  toolList = [
    {
      type: "scene",
      color: "#f68a50",
      top: (ICON_SIZE + 10) * 0 + TOOL_PANE_OFFSET
    },

    {
      type: "character",
      color: "#fec64c",
      top: (ICON_SIZE + 10) * 1 + TOOL_PANE_OFFSET
    },

    {
      type: "sticker",
      color: "#3e97a5",
      top: (ICON_SIZE + 10) * 2 + TOOL_PANE_OFFSET
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
                    left: this.toolStore.open !== "" ? 0 : -1 * TOOL_PANE_WIDTH,
                    display: this.toolStore.open === ele.type ? "flex" : "none"
                  }
                ]}
              >
                <Image style={{width: TOOL_PANE_WIDTH, height: TOOL_PANE_OFFSET}} source={ToolBar_Tap}></Image>                
                <ToolItem select={this.props.select} type={ele.type} />
              </View>

              {/* tool icon */}
              <TouchableOpacity
                onPress={() => {
                  this.soundStore.playSoundEffect(this.toolPlayer, 3, 0)
                  this.toolStore.toggleOpen(ele.type);
                  if(this.state.selectIndex === index) this.setState({ selectIndex: -1 })
                  else this.setState({ selectIndex: index })
                }}
                style={[
                  styles.toolIcon,
                  {
                    top: this.state.selectIndex < index && this.state.selectIndex != -1 ? ele.top + 10: ele.top,
                    left: this.toolStore.open !== "" ? TOOL_PANE_WIDTH : 0
                  }
                ]}
              >
                <Image
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
    width: TOOL_PANE_WIDTH,
    flexDirection: "row",
    // justifyContent: "flex-start",
    // textAlign: "center"
  },

  icon: {
    position: "relative",
    width: ICON_SIZE,
    height: ICON_SIZE
  },

  selectIcon: {
    position: "relative",
    width: ICON_SIZE * 1.2,
    height: ICON_SIZE * 1.2
  },

  toolPane: {
    position: "absolute",
    width: TOOL_PANE_WIDTH,
    height: "100%"
  },

  toolIcon: {
    textAlign: "center",
    position: "absolute",
    left: 0
  }
});
