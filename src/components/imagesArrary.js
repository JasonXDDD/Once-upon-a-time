import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Gestures from 'react-native-easy-gestures'

@inject('rootStore')
@observer
export default class ImagesArrary extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
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
                                <Gestures key={content.id}>
                                    <ListItem  onPressIn={() => {
                                        this.store.copyAddElement();
                                        const copy = this.store.copy;
                                            for (let i = 0; i < this.store.count; i++) {
                                              copy.push(
                                                <Gestures>
                                                    <Image
                                                    source={content.image}
                                                    /> 
                                                    </Gestures>    
                                              );
                                            }
                                            this.store.setCopy(copy)
                                    }}>                            
                                        <Image
                                        style={{ width: 125, height: 125,}}
                                        source={content.image}
                                        />                            
                                    </ListItem> 
                                </Gestures>
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