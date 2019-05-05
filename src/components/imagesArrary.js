import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, ScrollView } from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable, autorun, action } from 'mobx'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Gestures from 'react-native-easy-gestures'


  
@inject('rootStore')
@observer
export default class ImagesArrary extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
        this.state = {
            copy: [],
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
                                        const copy = this.state.copy;
                                        for (let i = 0; i < 1; i++) {
                                          copy.push(
                                                <Gestures
                                                key={content.id}
                                                style={{
                                                    position: 'absolute'
                                                }}>
                                                <TouchableHighlight  
                                                onLongPress={() => {this.store.selectImage(content.id)}}>
                                                <Image
                                                source={content.image}
                                                />  
                                                </TouchableHighlight> 
                                                </Gestures> 
                                          );
                                        }
                                        this.props.setCopy(copy)
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