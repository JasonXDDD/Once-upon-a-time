/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import TabBar from './src/components/tabBar';
import { SafeAreaView } from 'react-navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <TabBar></TabBar>;
  }
}

