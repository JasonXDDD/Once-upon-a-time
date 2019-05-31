import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Animated,
  ImageBackground,
  TouchableOpacity
 } from "react-native";
import NaviBar from '../../components/navi-bar'
import { inject, observer } from 'mobx-react'

import RecordStory_BG from '../../assets/images/RecordStory/BG.png'
import Btn_Stop from '../../assets/images/RecordStory/Btn_Stop.png'
import Btn_Recording from '../../assets/images/RecordStory/Btn_Recording.png'

@inject('rootStore')
@observer
export default class Page1 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
    this.state = {
      timer: 30,
      isRecord: true,
      record: Btn_Recording
    }
} 

Recording() {
  this.state.isRecord = !this.state.isRecord  
  this.state.record = this.state.isRecord ? Btn_Recording : Btn_Stop ;

  if( this.state.isRecord === false ) {
      this.interval = setInterval(
        () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
        1000
      );    
  }

  if( this.state.isRecord === true ) {
    clearInterval(this.interval);
    this.setState({
      timer: 30,
    })
  }

}


componentDidUpdate(){
  if(this.state.timer === 0){ 
    clearInterval(this.interval);

    this.state.isRecord = !this.state.isRecord  
    this.state.record = this.state.isRecord ? Btn_Recording : Btn_Stop ;

    alert('錄故事已完成！')
    this.setState({
      timer: 30,
    })

  }
}

componentWillUnmount(){
 clearInterval(this.interval);
}

  render() {
    const array = [...this.store.save];
    const left = this.store.x;
    const top = this.store.y;
    const width = this.store.width;
    const height = this.store.height;
    return (

      <ImageBackground source={RecordStory_BG} style={{flex: 1}}>
        <NaviBar title={'錄故事'}/>
        <View 
        style={{
          position: 'absolute',
          width: 780,
          height: 540,
          bottom: 75,
          right: 122,
          backgroundColor: "#f6f6f6",
          overflow: 'hidden',
          borderRadius: 15,
        }}>
          {
            this.store.save.map((item, i)=>(
              <View key={i} style={{ 
                position: 'absolute',left: left[i], top: top[i], width: width[i], height: height[i]
               }} >
                {item}
              </View>
            ))
          }
          <Text style={{color: 'red',left: 333,top: 20,fontSize: 20}}>00:00:00:{this.state.timer}</Text>
        </View>
        <TouchableOpacity 
        style={{
          position: 'absolute',
          right: 21,
          top: 112,
        }}
        onPress={() => {
          this.Recording()
          }}>
          <Image
          source={this.state.record}
          style={{
          width: 54,
          height: 54,
          }}
          />
        </TouchableOpacity>
      </ImageBackground>
      
    )
  }

}

