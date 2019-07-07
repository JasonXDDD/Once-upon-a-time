import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import ToolItem from "./toolItem";

const TOOL_PANE_WIDTH = 135;

@inject("rootStore")
@observer
export default class ToolBar extends Component {
  toolList = [
    {
      type: "scene",
      color: "#f68a50",
      top: 30
    },

    {
      type: "character",
      color: "#fec64c",
      top: 113
    },

    {
      type: "sticker",
      color: "#3e97a5",
      top: 196
    }
  ];

  constructor(props) {
    super(props);
    this.toolStore = props.rootStore.toolStore;
    this.storyStore = props.rootStore.storyStore;
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { display: this.storyStore.isRecord ? "none" : "flex" }
        ]}
      >
        {this.toolList.map(ele => {
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
                <ToolItem select={this.props.select} type={ele.type} />
              </View>

              {/* tool icon */}
              <TouchableOpacity
                onPress={() => {
                  this.toolStore.toggleOpen(ele.type);
                }}
                style={[
                  styles.toolIcon,
                  {
                    top: ele.top,
                    left: this.toolStore.open !== "" ? TOOL_PANE_WIDTH : 0
                  }
                ]}
              >
                <Image
                  source={this.toolStore[ele.type + "Btn"]}
                  style={styles.icon}
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
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "center"
  },

  icon: {
    position: "relative",
    width: 80,
    height: 80
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
