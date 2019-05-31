import {appStore} from './app-store'
import { YellowBox } from 'react-native';

export {appStore}


YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
  ]);