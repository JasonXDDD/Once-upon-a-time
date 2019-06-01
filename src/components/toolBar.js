import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import ToolItem from './toolItem';

@inject('rootStore')
@observer
export default class ToolBar extends Component {

  toolList = [
    {
      type: 'scene',
      color: '#3776b1',
      top: 30
    },

    {
      type: 'character',
      color: '#3776b1',
      top: 100
    },

    {
      type: 'sticker',
      color: '#3e97a5',
      top: 170
    }
  ]

  constructor(props) {
    super(props)
    this.store = props.rootStore.toolStore
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.toolList.map(ele => {
            return (
              <View key={ele.type}>

                {/* tool pane */}
                <View
                  style={[
                    styles.toolPane,
                    {
                      backgroundColor: ele.color,
                      left: this.store.open !== '' ? 0 : -135,
                      display: this.store.open === ele.type ?  'flex': 'none',
                    },
                  ]}>
                  <ToolItem type={ele.type}></ToolItem>
                </View>

                {/* tool icon */}                
                <TouchableOpacity
                  onPress={() => {
                    this.store.toggleOpen(ele.type)
                  }}
                  style={[
                    styles.toolIcon,
                    { 
                      top: ele.top, 
                      left: this.store.open !== '' ? 135: 0
                    },
                  ]}
                >
                  <Image source={this.store[ele.type+ 'Btn']} style={styles.icon} />
                </TouchableOpacity>

              </View>
            )
          })
        }
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
