import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationActions } from 'react-navigation'

import Btn_Recording from '../../assets/images/RecordStory/Btn_Recording.png'
@inject('rootStore')
@observer
export default class StoryToolRecord extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.storyStore;
    this.toolbar = props.rootStore.toolStore;    
    this.navigation = props.navigation
  }

  hideBar() {
    const setParamsAction = NavigationActions.setParams({
      params: { showTabBar: false },
      key: this.navigation.state.key,
		})
		
    this.navigation.dispatch(setParamsAction)
  }

  render() {
    return (
      <View style={[styles.storyTool, {display: this.store.isRecord? 'none': 'flex'}]}>
        <TouchableOpacity 
        onPress={() => {
          this.store.isRecord = true;
          this.toolbar.open = '';
          this.hideBar();
        }}>
          <Image style={styles.toolIcon} source={Btn_Recording}/>
        </TouchableOpacity>
      </View>
    )
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.flatten({
  storyTool: {
    top: 10,
    left: (width/2) - 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 48
  },

  toolIcon: {
    width: 48,
    height: 48,
    marginHorizontal: 5
  }
})
