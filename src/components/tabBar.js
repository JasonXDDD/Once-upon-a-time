import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

import DrawSticker from "../pages/drawSticker";
import StoryBox from "../pages/storyBox";
import EditStory from "../pages/editStory";

import EditStorySelected from "../assets/images/TabBar/EditStory_Selected.png";
import EditStoryUnselected from "../assets/images/TabBar/EditStory_Unselected.png";
import DrawStorySelected from "../assets/images/TabBar/DrawStory_Selected.png";
import DrawStoryUnselected from "../assets/images/TabBar/DrawStory_Unselected.png";
import StoryBoxSelected from "../assets/images/TabBar/StoryBox_Selected.png";
import StoryBoxUnselected from "../assets/images/TabBar/StoryBox_Unselected.png";

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 120,
    position: "absolute",
    bottom: 25
  }
});

const TabMap = {
  EditStory: {
    screen: EditStory,
    navigationOptions: ({ navigation }) => {
      const showTabBar =
        navigation.state && navigation.state.params
          ? navigation.state.params.showTabBar
          : true;

      return {
        tabBarLabel: "   ",
        tabBarVisible: showTabBar,
        animationEnabled: true,
        tabBarOptions: {
          style: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "translate",
            borderTopColor: "rgba(255, 255, 255, 0)"
          }
        },
        tabBarIcon: ({ focused }) => (
          <Image
            focused={focused}
            style={[styles.icon]}
            source={focused ? EditStorySelected : EditStoryUnselected}
          />
        )
      };
    }
  },

  StoryBox: {
    screen: StoryBox,
    navigationOptions: {
      tabBarLabel: "   ",
      tabBarOptions: {
        style: {
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "translate",
          borderTopColor: "rgba(255, 255, 255, 0)"
        }
      },
      tabBarIcon: ({ focused }) => (
        <Image
          focused={focused}
          style={[styles.icon]}
          source={focused ? StoryBoxSelected : StoryBoxUnselected}
        />
      )
    }
  },

  DrwaSticker: {
    screen: DrawSticker,
    navigationOptions: {
      tabBarLabel: "   ",
      tabBarOptions: {
        style: {
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "translate",
          borderTopColor: "rgba(255, 255, 255, 0)"
        }
      },
      tabBarIcon: ({ focused }) => (
        <Image
          focused={focused}
          style={[styles.icon]}
          source={focused ? DrawStorySelected : DrawStoryUnselected}
        />
      )
    }
  }
};

const TabNavigator = createBottomTabNavigator(TabMap, {
  initialRouteName: "EditStory"
});

const TabBar = createAppContainer(TabNavigator);

export default TabBar;
