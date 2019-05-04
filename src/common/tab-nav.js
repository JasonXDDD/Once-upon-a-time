import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {createBottomTabNavigator} from 'react-navigation';

import Home from '../pages/home/home';
import Page3 from '../pages/page3/page3';
import Page1 from '../pages/page1/page1';
import Page2 from '../pages/page2/page2';
import {colors} from '../assets/styles/colors-theme';

const TabRouterMap = {
  home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '回主頁',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          size={32}
          name="ios-star"
          color={focused ? '#000' : '#9b9c9b'}
          style={[styles.icon]}
        />
      )
    }
  },
  page1: {
    screen: Page1,
    navigationOptions: {
      tabBarLabel: '編輯故事',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          size={32}
          name="ios-star"
          color={focused ? '#000' : '#9b9c9b'}
          style={[styles.icon]}
        />
      )
    }
  },
  page2: {
    screen: Page2,
    navigationOptions: {
      tabBarLabel: '錄影故事',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          size={32}
          name="ios-star"
          color={focused ? '#000' : '#9b9c9b'}
          style={[styles.icon]}
        />
      )
    }
  },
  page3: {
    screen: Page3,
    navigationOptions: {
      tabBarLabel: '故事箱',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          size={32}
          name="ios-star"
          color={focused ? '#000' : '#9b9c9b'}
          style={[styles.icon]}
        />
      )
    }
  },
}

export const TabNav = createBottomTabNavigator(TabRouterMap,{
  initialRouteName: 'home',
  tabBarOptions: {
    //当前选中的tab bar的文本颜色和图标颜色
    activeTintColor: '#000',
    //当前未选中的tab bar的文本颜色和图标颜色
    inactiveTintColor: '#9b9c9b',
    //是否显示tab bar的图标，默认是false
    showIcon: true,
    //showLabel - 是否显示tab bar的文本，默认是true
    showLabel: true,
    //是否将文本转换为大小，默认是true
    upperCaseLabel: false,
    //material design中的波纹颜色(仅支持Android >= 5.0)
    pressColor: 'red',
    //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
    pressOpacity: 0.8,
    //tab bar的样式
    style: {
      backgroundColor: '#d4d2d2',
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems:'center',
    },
    //tab bar的文本样式
    labelStyle: {
      fontSize: 16,
      margin: 1,
      position: 'absolute',
      bottom: 0,
    },
    //tab 页指示符的样式 (tab页下面的一条线).
    indicatorStyle: {height: 0},
  },
  //tab bar的位置, 可选值： 'top' or 'bottom'
  tabBarPosition: 'bottom',
  //是否允许滑动切换tab页
  swipeEnabled: true,
  //是否在切换tab页时使用动画
  animationEnabled: false,
  //是否懒加载
  lazy: false,
  //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
  backBehavior: 'none'
})

const styles = StyleSheet.flatten({
  icon: {
    position: 'absolute',
    top: 0,
  }
})