import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { inject, observer } from "mobx-react";
import { NavigationActions } from "react-navigation";
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";

@inject("rootStore")
@observer
export default class StoryToolRecord extends Component {
  buttonPlayer;

  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.toolStore = props.rootStore.toolStore;
    this.soundStore = props.rootStore.soundStore;
    this.navigation = props.navigation;
  }

  componentDidMount(){
    this.buttonPlayer = this.soundStore.genMusic('button')
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
            this.storyStore.openScenePane = true;
            this.toolStore.open = "";
            this.hideBar();
            
            this.soundStore.playSoundEffect(this.buttonPlayer, 1, 0)
            this.soundStore.playBGM(false)
          }}
        >
          <Image style={styles.toolIcon} source={RES.Btn_Recording} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  storyTool: {
    left: VAR.SCREEN_WIDTH / 2 - VAR.ICON_SIZE /2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },

  toolIcon: {
    marginTop: 25,
    width: VAR.ICON_SIZE / 50 * 80,
    height: VAR.ICON_SIZE,
    marginHorizontal: 5
  }
});
