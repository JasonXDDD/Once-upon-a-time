import {createStackNavigator, createAppContainer} from 'react-navigation'
import {TabNav} from './common/tab-nav';

function generateRoute(path, screen) {
  return {
    path,
    screen
  }
}


const stackRouterMap = {
  main: TabNav
}

const stackNavigate = createStackNavigator(stackRouterMap, {
  initialRouteName: 'main',
  headerMode: 'none'
})

const Router = createAppContainer(stackNavigate)

export default Router