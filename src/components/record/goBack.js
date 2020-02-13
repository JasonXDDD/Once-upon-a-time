import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { inject, observer } from "mobx-react";
import { NavigationActions } from "react-navigation";
import { RES } from "../../core/resource";
import { VAR } from "../../core/variable";


@inject("rootStore")
@observer
export default class GoBack extends Component {
  constructor(props) {
    super(props);
    this.storyStore = props.rootStore.storyStore;
    this.navigation = props.navigation;
  }

  showBar() {
    const setParamsAction = NavigationActions.setParams({
      params: { showTabBar: true },
      key: this.navigation.state.key
    });

    this.navigation.dispatch(setParamsAction);
  }

  render() {
    return (
      <View
        style={[
          styles.goBackTool,
          { display: !this.storyStore.isRecord ? "none" : "flex" }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.storyStore.isRecord = false;
            this.showBar();
          }}
        >
          <Image style={styles.toolIcon} source={RES.Btn_Edit} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goBackTool: {
    left: VAR.SCREEN_WIDTH / 2 - VAR.ICON_SIZE /2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },

  toolIcon: {
    marginTop: 10,
    width: VAR.ICON_SIZE / 50 * 80,
    height: VAR.ICON_SIZE,
    marginHorizontal: 5
  }
});
