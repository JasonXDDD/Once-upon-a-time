
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import { StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../pages/homeScreen";
import EditStory from "../pages/editStory";
import RecordStory from "../pages/recordStory";
import StoryBox from "../pages/storyBox";

const TabMap = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: '主頁',
      
    }
  },
  EditStory: {
    screen: EditStory,
    navigationOptions: {
      tabBarLabel: '創故事',
      
    }
  },
  RecordStory: {
    screen: RecordStory,
    navigationOptions: {
      tabBarLabel: '錄影故事',
      
    }
  },
  StoryBox: {
    screen: StoryBox,
    navigationOptions: {
      tabBarLabel: '故事箱',
      
    }
  },
}

const TabNavigator = createBottomTabNavigator(TabMap, {
	initialRouteName: "Home"
});

const TabBar = createAppContainer(TabNavigator);

export default TabBar;

