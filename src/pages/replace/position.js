import React, { Component } from 'react'
import ReactNative, { View, TouchableOpacity, Platform, StyleSheet, Text, findNodeHandle } from 'react-native';
import Gestures from 'react-native-easy-gestures' 
export default class Page3 extends Component
{
   constructor()
   {
       super();

       this.state = { 
         x: null, 
         y: null, 
         width: null, 
         height: null,
         left: 0,
         top: 0,
      }
   }

   calculateDimensions = () =>
   {
       this.refs.innerView.measureLayout(ReactNative.findNodeHandle(this.refs.containerView), ( xPos, yPos, Width, Height ) =>
       {
           this.setState({ x: xPos, y: yPos, width: Width, height: Height });
       });
   }

   setDimensions = () =>
   {
      this.setState({
        left: this.state.x,
        top: this.state.y
      })
      alert(this.state.x)
      alert(this.state.y)
   }

   render()
   {
       return(

           <View ref = "containerView" style = { styles.container }>

              <Gestures>
               <View ref = "innerView" style={{
                 left: this.state.left,
                 top: this.state.top,
                 backgroundColor: '#01579B',
                 marginBottom: 50,
                 justifyContent: 'center',
                 alignItems: 'center'
               }}>
                   <Text style = { styles.calculatedText }>X: { this.state.x }</Text>
                   <Text style = { styles.calculatedText }>Y: { this.state.y }</Text>
               </View>
               </Gestures> 

               <Gestures style={{position: 'absolute'}}>
               <View style={{
                 left: this.state.left,
                 top: this.state.top,
                 backgroundColor: '#01579B',
                 marginBottom: 50,
                 justifyContent: 'center',
                 alignItems: 'center'
               }}>
                   <Text style = { styles.calculatedText }>left: { this.state.x }</Text>
                   <Text style = { styles.calculatedText }>top: { this.state.y }</Text>             
               </View> 
               </Gestures> 

               <TouchableOpacity activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.calculateDimensions }>
                   <Text style = { styles.text }>Calculate Blue Box's Dimensions</Text>
               </TouchableOpacity>


               <TouchableOpacity onPress = { this.setDimensions }>
                  <Text style = { styles.text }>set Blue Box's Dimensions</Text>
              </TouchableOpacity>
           </View>
       );
   }
}

const styles = StyleSheet.create(
{
   container:
   {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#aaa',
       marginTop: (Platform.OS === 'ios') ? 20 : 0
   },

   innerView:
   {
       backgroundColor: '#01579B',
       marginBottom: 50,
       justifyContent: 'center',
       alignItems: 'center'
   },

   Btn:
   {
       position: 'absolute',
       left: 0,
       right: 0,
       bottom: 0,
       paddingHorizontal: 10,
       height: 50,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0.5)'
   },

   text:
   {
       color: 'white',
       fontSize: 17
   },

   calculatedText:
   {
       color: 'white',
       marginVertical: 5,
       fontSize: 16
   }
});