import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from "react-native";
import { createBottomTabNavigator, createAppContainer, createStackNavigator, BottomTabBar } from "react-navigation";
import * as store from "../stores/index";
import * as Animatable from 'react-native-animatable';
import { RES } from "../core/resource";
import { VAR } from "../core/variable";

import DrawSticker from "../pages/drawSticker";
import StoryBox from "../pages/storyBox";
import EditStory from "../pages/editStory";

const tabPlayer = store.soundStore.genMusic('tab')

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
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          store.soundStore.playSoundEffect(tabPlayer, 0.5, 1)
          defaultHandler()  
        },
        tabBarIcon: ({ focused }) => {
          return (
            <Animatable.Image
              animation={focused? "bounce": ""}
              iterationCount="infinite"
              iterationDelay={1000}
              direction="alternate"
              easing="ease-out"

              focused={focused}
              style={focused ? styles.selectIcon : styles.icon}
              source={focused ? RES.EditStorySelected : RES.EditStoryUnselected}
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
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        store.soundStore.playSoundEffect(tabPlayer, 0.5, 1)
        defaultHandler()
      },
      tabBarIcon: ({ focused }) => {
        return (
          <Animatable.Image
            animation={focused? "bounce": ""}
            iterationCount="infinite"
            iterationDelay={1000}
            direction="alternate"
            easing="ease-out"

            focused={focused}
            style={focused ? styles.selectIcon : styles.icon}
            source={focused ? RES.StoryBoxSelected : RES.StoryBoxUnselected}
          />
        )
      }
    }
  },

  DrwaSticker: {
    screen: DrawSticker,
    navigationOptions: {
      tabBarLabel: "   ",
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        store.soundStore.playSoundEffect(tabPlayer, 0.5, 1)
        defaultHandler()
      },
      tabBarIcon: ({ focused }) => {
        return (
          <Animatable.Image
            animation={focused? "bounce": ""}
            iterationCount="infinite"
            iterationDelay={1000}
            direction="alternate"
            easing="ease-out"

            focused={focused}
            style={focused ? styles.selectIcon : styles.icon}
            source={focused ? RES.DrawStorySelected : RES.DrawStoryUnselected}
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
      <Image style={styles.tabBar} source={RES.TabBar_BG} />
      <TabBarComponent {...props} style={styles.tabStyle}/>
    </View>
  )
});

const TabBar = createAppContainer(TabNavigator);

export default TabBar;

const styles = StyleSheet.create({
  icon: {
    width: 150 * 1.1,
    height: 80 * 1.1,
  },

  selectIcon: {
    width: 150 * 1.3,
    height: 80 * 1.3,
  },

  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: (VAR.SCREEN_WIDTH * 0.9),
    height: (VAR.SCREEN_WIDTH * 0.9) * 115 / 1897
  },

  tabStyle: {
    backgroundColor: 'transparent',
    borderTopColor: "rgba(255, 255, 255, 0)",
    width: VAR.SCREEN_WIDTH * 0.8,
    bottom: 40
  },

  tabView: {
    position: 'absolute',
    width: VAR.SCREEN_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0  
  }
});