import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { inject, observer } from "mobx-react";
import { NavigationActions } from "react-navigation";

import Btn_Recording from "../../assets/images/RecordStory/Btn_Recording.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ICON_SIZE = 60;

@inject("rootStore")
@observer
export default class StoryToolRecord extends Component {
  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
    this.navigation = props.navigation;
  }

  hideBar() {
    const setParamsAction = NavigationActions.setParams({
      params: { showTabBar: false },
      key: this.navigation.state.key
    });

    this.navigation.dispatch(setParamsAction);
  }

  render() {
    return (
      <View
        style={[
          styles.storyTool,
          { display: this.storyStore.isRecord ? "none" : "flex" }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.storyStore.isRecord = true;
            this.toolStore.open = "";
            this.hideBar();
          }}
        >
          <Image style={styles.toolIcon} source={Btn_Recording} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  storyTool: {
    left: screenWidth / 2 - ICON_SIZE /2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },

  toolIcon: {
    marginTop: 10,
    width: ICON_SIZE / 50 * 80,
    height: ICON_SIZE,
    marginHorizontal: 5
  }
});
