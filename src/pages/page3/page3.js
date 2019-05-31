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
  TouchableOpacity,
 } from "react-native";
import { inject, observer } from 'mobx-react'
import NaviBar from '../../components/navi-bar'
import Carousel from 'react-native-carousel-control'

import LookStory_BG from '../../assets/images/LookStory/BG.png'

import Fake from '../../assets/images/LookStory/Fake.png'

import Delet from '../../assets/images/LookStory/Btn_delete.png'
import Share from '../../assets/images/LookStory/Btn_share.png'

@inject('rootStore')
@observer
export default class Page3 extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
} 



  render() {
    return (

      <ImageBackground source={LookStory_BG} style={{flex: 1}}>
        <NaviBar title={'看故事'}/>
        <Carousel pageStyle={{
          position: 'absolute',
          left: 284,
          top: 130,
        }}>
            <TouchableOpacity style={{
                width: 457,
                height: 317,
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: "#f6f6f6",
                borderColor: "#bebebe",                
            }}>
                <Image
                source={Fake}
                style={{
                    width: '100%',
                    height: '100%',
                }} />
            </TouchableOpacity>
        </Carousel>
        <View style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 129,
            left: 448,
            bottom: 130,
        }}>
            <TouchableOpacity>
                <Image
                source={Delet}
                style={{
                    width: 54,
                    height: 54,
                }} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                source={Share}
                style={{
                    width: 54,
                    height: 54,
                }} />
            </TouchableOpacity>
        </View>
      </ImageBackground>
      
    )
  }

}

