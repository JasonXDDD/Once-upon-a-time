import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Animated,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity
 } from "react-native";
import NaviBar from '../../components/navi-bar'
import ToolBar from '../../components/tool-bar'
import { inject, observer } from 'mobx-react'

import EditStory_BG from '../../assets/images/EditStory/BG.png'
import Redo from '../../assets/images/EditStory/btn_redo.png'
import Save from '../../assets/images/EditStory/btn_save.png'
import Teaching from '../../assets/images/EditStory/Teaching.png'
import Recice from '../../components/stick/recice'

@inject('rootStore')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
    this.state = {
      parentCopy : [],
      // drawerContent: false,
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
      <ImageBackground  source={EditStory_BG} style={{flex: 1}}>
        <NaviBar title={'創故事'}/>
        <ToolBar 
        setCopy={(copy) => this.setCopy(copy)}
        parentCopy={this.state.parentCopy}
        />
        <View 
        ref={ref => this.store.containerView = ref}
        style={{
          position: 'absolute',
          width: 801,
          height: 561,
          bottom: 54.5,
          right: this.store.rightDirection,
          backgroundColor: "#f6f6f6",
          borderColor: "#bebebe",
          overflow: 'hidden',
          borderWidth: 1,
          borderRadius: 15,
        }} >

            {/* {this.state.parentCopy} */}
            <Recice />
        </View>
        <View style={{
          top: 108,
          right: this.store.undoSave,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          position: 'absolute',
          width: 100,
          height: 50,
        }}>
            <TouchableOpacity onPress={() => {this.empty()}}>
                <Image
                style={{
                  width: 48,
                  height: 48,
                }}
                source={Redo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.store.positionCanvas(this.state.parentCopy)}}>
                <Image
                style={{
                  width: 48,
                  height: 48,
                  left: 10.5,
                }}
                source={Save} />
            </TouchableOpacity>            
        </View>

        <View
          style={{ 
          display: this.store.teaching,
          position: 'absolute',
          bottom: 54.5,
          right: 111.5,         
          }}>
                <Image
                source={Teaching}
                style={{
                  width: 801,
                  height: 561,
                  borderRadius: 15,                   
                }} />
        </View >

      </ImageBackground>
    )
  }
}
