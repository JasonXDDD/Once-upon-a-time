import React, { Component } from 'react'
import { View, Image,TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { NavigationActions } from 'react-navigation'

import Redo from '../../assets/images/EditStory/btn_redo.png'
@inject('rootStore')
@observer
export default class GoBack extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.storyStore
    this.navigation = props.navigation
  }

  showBar() {
    const setParamsAction = NavigationActions.setParams({
      params: { showTabBar: true },
      key: this.navigation.state.key,
		})
		
    this.navigation.dispatch(setParamsAction)
  }

  render() {
    return (
      <View style={[styles.goBackTool, {display: !this.store.isRecord? 'none': 'flex'}]}>
        <TouchableOpacity onPress={() => { 
          this.store.isRecord = false;
          this.showBar();
        }}>
          <Image style={styles.toolIcon} source={Redo} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  goBackTool: {
    top: 10,
    left: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    width: 58,
    height: 48
  },

  toolIcon: {
    width: 48,
    height: 48,
    marginHorizontal: 5
  }
})
