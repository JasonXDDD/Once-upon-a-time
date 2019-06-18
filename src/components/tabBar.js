
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation"

import DrawSticker from '../pages/drawSticker'
import StoryBox from "../pages/storyBox"
import EditStory from "../pages/editStory"

import EditStorySelected from '../assets/images/TabBar/EditStory_Selected.png'
import EditStoryUnselected from '../assets/images/TabBar/EditStory_Unselected.png'
import DrawStorySelected from '../assets/images/TabBar/DrawStory_Selected.png'
import DrawStoryUnselected from '../assets/images/TabBar/DrawStory_Unselected.png'
import LookStorySelected from '../assets/images/TabBar/LookStory_Selected.png'
import LookStoryUnselected from '../assets/images/TabBar/LookStory_Unselected.png'

const TabMap = {
  
  EditStory: {
    screen: EditStory,
    navigationOptions: ({ navigation }) => {
      const showTabBar = navigation.state && navigation.state.params
        ? navigation.state.params.showTabBar : true;
      
      return {
        tabBarLabel: '   ',
        tabBarVisible: showTabBar,
        animationEnabled: true,
        tabBarIcon:({focused}) => (
          <Image
            focused={focused}
            style={[styles.icon]}
            source={focused ? EditStorySelected : EditStoryUnselected}
          />
        )
      }
      
    }
  },
  DrwaSticker: {
    screen: DrawSticker,
    navigationOptions: {
      tabBarLabel: '   ',
      tabBarIcon:({focused}) => (
        <Image
          focused={focused}
          style={[styles.icon]}
          source={focused ? DrawStorySelected : DrawStoryUnselected}
        />
      )
    }
  },
  StoryBox: {
    screen: StoryBox,
    navigationOptions: {
      tabBarLabel: '   ',
      tabBarIcon:({focused}) => (
        <Image
          focused={focused}
          style={[styles.icon]}
          source={focused ? LookStorySelected : LookStoryUnselected}
        />
      )
    }
  },
}


const TabNavigator = createBottomTabNavigator(TabMap, {
	initialRouteName: "EditStory"
});


const TabBar = createAppContainer(TabNavigator);

export default TabBar;

const styles = StyleSheet.create({
  icon: {
    width: 129,
    height: 75,
    position: 'absolute',
    bottom: 0,
  }
})