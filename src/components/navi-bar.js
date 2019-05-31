import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar} from 'react-native'
import PropTypes from 'prop-types'
import {colors} from '../assets/styles/colors-theme';
import Icon from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')

export default class NaviBar extends Component {
  static propTypes = {
    style: PropTypes.object,
    leftItem: PropTypes.node, //原则上控制在宽度40的icon
    rightItem: PropTypes.node, //原则上控制在宽度40的icon
    title: PropTypes.string,
    titleColor: PropTypes.string,
    iconColor: PropTypes.string
  }

  render() {
    const props = this.props;

    return (
      
      <View style={[styles.naviBar, props.style]}>
          <View style={{width: 40}}><View/>
        </View>
        <Text style={{color: props.titleColor || '#000',fontWeight: 'bold',fontSize: 20,}}>{props.title}</Text>
        <View style={{width: 40}}>
          {
            props.rightItem ? props.rightItem : <View/>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  naviBar: {
    width,
    height: Platform.OS === 'ios' ? 44 : 56, //ios原生导航高度是44，android是56
    backgroundColor: colors.statusBarColor,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  }
})