import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class ToolItem extends Component {
  constructor(props){
    super(props);
    this.store = props.rootStore.toolStore;
    this.type = props.type;
  }
  render(){

    // console.log(this.type, this.store[this.type][0].image);
    
    return (
      <View style={{marginTop: 10}}>
      {
        this.store[this.type].map(ele => {
          console.log(ele.id, ele.image);
          
          return (
            <TouchableOpacity style={styles.toolImage} key={ele.id}>
              <Image style={{ width: 78, height: 78 }} source={ele.image}></Image>
              <Text style={{color: 'white'}}>{ele.id}</Text>
            </TouchableOpacity>
          )
        })
      }
      </View>
    )
  }
}


const styles = StyleSheet.flatten({
  toolImage: {
    marginVertical: 10,
    alignItems: 'center'
  },
})