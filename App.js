
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import TabBar from './src/components/tabBar';
import { SafeAreaView } from 'react-navigation';
import { Provider, observer } from 'mobx-react'
import * as store from './src/store/index';


type Props = {};

@observer
export default class App extends Component<Props> {
  render() {
    return (
      <Provider rootStore={store}>
        <SafeAreaView
          style={{flex: 1}}
          forceInset={{
            top: 'always',
            bottom: 'always'
          }}
        >
          <TabBar></TabBar>
        </SafeAreaView>
      </Provider>
    );
  }
}

