import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Animated,
  TouchableHighlight
 } from "react-native";
import NaviBar from '../../components/navi-bar'
import ToolBar from '../../components/ToolBar'
import { inject, observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

@inject('rootStore')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
    this.state = {
      parentCopy : [],
    }
} 



setCopy(copy) {
  this.setState({
    parentCopy: copy,
  })
}

empty() {
  this.setState({
    parentCopy: []
  })  
}



  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#f3f3f3'}}>
        <NaviBar title={'編輯故事'}/>
        <ToolBar 
        setCopy={(copy) => this.setCopy(copy)}
        parentCopy={this.state.parentCopy}
        />
        <View style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          bottom: 50,
          right: this.store.rightDirection,
          backgroundColor: "#f6f6f6",
          borderColor: "#888888",
          overflow: 'hidden',
          borderWidth: 1,
          borderRadius: 15,
        }} >
                {this.state.parentCopy}
        </View>
        <View style={{
          top: 110,
          right: this.store.undoSave,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          position: 'absolute',
          width: 100,
          height: 60,
        }}>
                <Icon
                    size={38}
                    name='undo'
                    color='#2184ff'
                    onPress={() => {this.empty()}}
                />
                <Icon
                    size={40}
                    name='save'
                    color='#2184ff'
                    style={styles.space}
                    onPress={() => {
                      this.store.positionCanvas(this.state.parentCopy);
                    }}
                />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  space: {
      left: 30,
  },
})