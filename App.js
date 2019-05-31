import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import Router from './src/router';
import {colors} from './src/assets/styles/colors-theme';
import {Provider as ProviderAntd, Modal} from '@ant-design/react-native'
import { Provider, observer } from 'mobx-react'
import * as stores from './src/stores/index';


@observer
export default class App extends Component {
  constructor(props) {
    super(props)
  }




  render() {
    return (
      <Provider rootStore={stores}>
        <ProviderAntd>
          <SafeAreaView
            style={{flex: 1, backgroundColor: colors.statusBarColor}}
            forceInset={{
              top: 'always',
              bottom: 'always'
            }}
          >
            <StatusBar
              animated={true}
              barStyle={'dark-content'}
              backgroundColor={colors.statusBarColor}
              translucent={true}
            />
            <Router />
          </SafeAreaView>
        </ProviderAntd>
      </Provider>
    );
  }





}
