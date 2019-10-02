import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  BottomTabBar
} from "react-navigation";

import DrawSticker from "../pages/drawSticker";
import StoryBox from "../pages/storyBox";
import EditStory from "../pages/editStory";

import TabBar_BG from "../assets/images/TabBar/BG.png";
import EditStorySelected from "../assets/images/TabBar/EditStory_Selected.png";
import EditStoryUnselected from "../assets/images/TabBar/EditStory_Unselected.png";
import DrawStorySelected from "../assets/images/TabBar/DrawStory_Selected.png";
import DrawStoryUnselected from "../assets/images/TabBar/DrawStory_Unselected.png";
import StoryBoxSelected from "../assets/images/TabBar/StoryBox_Selected.png";
import StoryBoxUnselected from "../assets/images/TabBar/StoryBox_Unselected.png";
import Sound from 'react-native-sound';


import buttonCllick from "../assets/sound/button.mp3"
const buttonMusic = new Sound(buttonCllick, (error)=> {
  if(error) Alert.alert("失敗")
})
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



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
        tabBarIcon: ({ focused }) => {
          if(focused) {
            buttonMusic.setVolume(0.5)
            buttonMusic.play()
          }
          return (
            <Image
              focused={focused}
              style={[styles.icon]}
              source={focused ? EditStorySelected : EditStoryUnselected}
            />
          )
        }
      };
    }
  },

  StoryBox: {
    screen: StoryBox,
    navigationOptions: {
      tabBarLabel: "   ", 
      tabBarIcon: ({ focused }) => {
        if(focused) {
          buttonMusic.setVolume(0.5)
          buttonMusic.play()
        }
        return (
          <Image
            focused={focused}
            style={[styles.icon]}
            source={focused ? StoryBoxSelected : StoryBoxUnselected}
          />
        )
      }
    }
  },

  DrwaSticker: {
    screen: DrawSticker,
    navigationOptions: {
      tabBarLabel: "   ",
      tabBarIcon: ({ focused }) => {
        if(focused) {
          buttonMusic.setVolume(0.5)
          buttonMusic.play()
        }
        return (
          <Image
            focused={focused}
            style={[styles.icon]}
            source={focused ? DrawStorySelected : DrawStoryUnselected}
          />
        )
      }
    }
  }
};


const TabBarComponent = (props) => (
  <BottomTabBar {...props}/>  
);

const TabNavigator = createBottomTabNavigator(TabMap, {
  initialRouteName: "EditStory",
  tabBarComponent: (props) => ( 
    <View style={styles.tabView}>
      <Image style={styles.tabBar} source={TabBar_BG} />
      <TabBarComponent {...props} style={styles.tabStyle}/>
    </View>
  )
});

const TabBar = createAppContainer(TabNavigator);

export default TabBar;

const styles = StyleSheet.create({
  icon: {
    width: 150 * 1.2,
    height: 80 * 1.2,
  },

  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: (screenWidth * 0.95),
    height: (screenWidth * 0.95) * 115 / 1897
  },

  tabStyle: {
    backgroundColor: 'transparent',
    borderTopColor: "rgba(255, 255, 255, 0)",
    width: screenWidth * 0.8,
    bottom: 50
  },

  tabView: {
    position: 'absolute',
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0
    
  }
});