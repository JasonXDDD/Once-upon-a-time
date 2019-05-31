import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, Animated, Platform } from 'react-native';
import Gestures from 'react-native-easy-gestures'  

@inject('rootStore')
@observer
export default class Recice extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
    } 



    
        render() {
            const valueArray = this.store.valueArray
            const index = this.store.index
            const image = this.store.image
            console.log(valueArray);

            const newArray = valueArray.map(( item, key ) => {
                    return(
                        <Gestures key={item.id}>
                            <TouchableHighlight
                            onLongPress={() => {this.store.selectImage(key)}}>
                            <View>
                            <Image
                            source={this.store.image}
                            style={{position: 'absolute'}}
                            />
                            </View>
                            </TouchableHighlight>
                        </Gestures>
                    );
            });
                return(

                    <View>
                    {newArray}
                    </View>
                )
            }
        }


        const styles = StyleSheet.create(
        {
            MainContainer:
            {
                flex: 1,
                backgroundColor: '#eee',
                justifyContent: 'center',
                paddingTop: (Platform.OS == 'ios') ? 20 : 0
            },
         
            Animated_View_Style:
            {
                height: 60,
                backgroundColor: '#FF9800',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5
            },
         
            View_Inside_Text:
            {
                color: '#fff',
                fontSize: 24
            },
         
            TouchableOpacityStyle:{
          
              position: 'absolute',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              right: 30,
              bottom: 30,
            },
         
            FloatingButtonStyle: {
          
              resizeMode: 'contain',
              width: 50,
              height: 50,
            }
        });

