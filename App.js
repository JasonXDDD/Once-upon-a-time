
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import TabBar from './src/components/tabBar';
import { SafeAreaView } from 'react-navigation';
import { observer } from 'mobx';


@observer
type Props = {};
export default class App extends Component<Props> {
  render() {
    return <TabBar></TabBar>;
  }
}

