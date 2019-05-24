import React, { Component } from 'react'
import ReactNative, { 
    Alert, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    TouchableOpacity, 
    Image, 
    ScrollView,
    UIManager,
    findNodeHandle, } from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable, autorun, action } from 'mobx'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Gestures from 'react-native-easy-gestures'


  
@inject('rootStore')

export default class ImagesArrary extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
        this.state = {
            copy: [], 
            left: 50,
            top: 50,
        }
        
    } 

  

    componentWillReceiveProps(nextProps) {
        if (nextProps.parentCopy !== this.state.copy) {
          this.parentCopy()
        } 
    }  

    parentCopy() {
        const { parentCopy } = this.props
        this.setState({
          copy: []
        })
        console.log(parentCopy)
      }


    selectImage(key) {
        Alert.alert(
          '確定要刪除圖片嗎？',
          ' ',
          [
            {text: '確定', onPress: () => {this.removeElement(key)}},
            {text: '取消', onPress: () => console.log('取消')},
          ],
          { cancelable: false }
        )
      } 

      removeElement(key) {
        const array = [...this.state.copy]; 
        const index = array.findIndex(obj => obj.key === key);
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({
            copy: array
          })
          this.props.setCopy(array)
        }
      }
      


    render() {
        const ImageBox = this.store.list.map((list) =>             
        <Collapse key={list.id}>
            <CollapseHeader >
                <Separator bordered style={styles.tabTitle}>
                <Text style={styles.tabText}>{list.title}</Text>
                </Separator>
            </CollapseHeader>                
            <CollapseBody style={styles.imagesArrary}>
            {         
                           list.content.map(content => 
                                <ListItem  key={content.id} onPressIn={() => {
                                        const x = this.state.x;
                                        const y = this.state.y;
                                        const copy = this.state.copy;
                                        const min = 1;
                                        const max = 100;
                                        const rand = min + Math.random() * (max - min);
                                        for (let i = 0; i < 1; i++) {
                                          copy.push(
                                                <View 
                                                key={content.id + rand}
                                                ref={ref => this.store.containerView = ref}>
                                                <Gestures
                                                style={{
                                                    position: 'absolute',
                                                }}>
                                                <TouchableHighlight
                                                ref={ref => this.store.innerView = ref} 
                                                onLongPress={() => {this.selectImage(content.id + rand)}}>
                                                <Image
                                                source={content.image}
                                                />  
                                                </TouchableHighlight>
                                                </Gestures>
                                                </View> 
                                          );
                                        }
                                        this.props.setCopy(copy)
                                        this.store.toggleOpen()
                                }}>                            
                                    <Image
                                    style={{ width: 125, height: 125,}}
                                    source={content.image}
                                    />                            
                                </ListItem> 
                        )
            }
            </CollapseBody>                
        </Collapse>  
           
    );
        return (
            <View>        
                {ImageBox}
            </View>
        )
    }
}


const styles = StyleSheet.flatten({
tabTitle: {
    backgroundColor: '#b5b5b5',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
},
tabText: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    color: '#fff',
    position: 'absolute',
},
imagesArrary: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',    
},
})