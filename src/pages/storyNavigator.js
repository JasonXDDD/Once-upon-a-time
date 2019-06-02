import { createStackNavigator } from 'react-navigation'
import EditStory from './editStory'
import RecordStory from './recordStory'

const StoryNavigator = createStackNavigator({
  EditStory: { screen: EditStory, navigationOptions: { header: null } },
  RecordStory: { screen: RecordStory, navigationOptions: { header: null } }
})

StoryNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  
  return {
    tabBarVisible
  }
}

export default StoryNavigator
