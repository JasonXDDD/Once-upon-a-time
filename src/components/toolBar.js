import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import ToolItem from './toolItem';

@inject('rootStore')
@observer
export default class ToolBar extends Component {

  constructor(props) {
    super(props)
    this.store = props.rootStore.toolStore
  }

  render() {
    return (
      <View style={styles.container}>
        {/* scene choose */}
        <View
          style={[
            styles.toolPane,
            {
              backgroundColor: '#3776b1',
              left: this.store.open !== '' ? 0 : -135,
              opacity: this.store.open === 'scene' ? 1 : 0,
            },
          ]}>
          
          <ToolItem type="scene"></ToolItem>
        </View>
      

        <TouchableOpacity
          onPress={() => {
            this.store.toggleOpen('scene')
          }}
          style={[
            styles.toolIcon,
            { top: 30, left: this.store.open !== '' ? 135: 0 },
          ]}
        >
          <Image source={this.store.sceneBtn} style={styles.icon} />
        </TouchableOpacity>




        {/* character choose */}
        <View
          style={[
            styles.toolPane,
            {
              backgroundColor: '#3776b1',
              left: this.store.open !== '' ? 0 : -135,
              opacity: this.store.open === 'character' ? 1 : 0,
            },
          ]}>
          
          <ToolItem type="character"></ToolItem>          
        </View>


        <TouchableOpacity
          onPress={() => {
            this.store.toggleOpen('character')
          }}
          style={[
            styles.toolIcon,
            { top: 100, left: this.store.open !== '' ? 135: 0 },
          ]}
        >
          <Image source={this.store.characterBtn} style={styles.icon} />
        </TouchableOpacity>





        {/* sticker choose */}
        <View
          style={[
            styles.toolPane,
            {
              backgroundColor: '#3e97a5',
              left: this.store.open !== '' ? 0 : -135,
              opacity: this.store.open === 'sticker' ? 1 : 0,
            },
          ]}>
          <ToolItem type="sticker"></ToolItem>
        </View>
      

        <TouchableOpacity
          onPress={() => {
            this.store.toggleOpen('sticker')
          }}
          style={[
            styles.toolIcon,
            { top: 170, left: this.store.open !== '' ? 135: 0 },
          ]}
        >
          <Image source={this.store.stickerBtn} style={styles.icon} />
        </TouchableOpacity>


      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  icon: {
    position: 'relative',
    width: 54,
    height: 54,
  },

  toolPane: {
    position: 'absolute',
    width: 135,
    height: '100%',
  },

  toolIcon: {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
  },
})
