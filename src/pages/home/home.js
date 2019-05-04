import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {colors} from '../../assets/styles/colors-theme';
import NaviBar from '../../components/navi-bar';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar title={'Home'}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Home</Text>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  button: {
    marginTop: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.statusBarColor
  },
  buttonText: {
    color: '#fff'
  }
})