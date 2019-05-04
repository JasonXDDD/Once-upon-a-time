import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { inject, observer } from 'mobx-react'
import MenuDrawer from 'react-native-side-drawer'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Gestures from 'react-native-easy-gestures'
import ImagesArrary from './imagesArrary'


@inject('rootStore')
@observer
export default class ToolBar extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
        this.state = {
            copy : []
        }
    } 



    setCopy(data){
        this.copy = data
      }
  
      drawerContent = () => {
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
                                        const copy = this.state.copy
                                        for (let i = 0; i < 1; i++) {
                                            copy.push(
                                              <Gestures>
                                                <Image
                                                source={content.image}
                                                />  
                                                </Gestures>
                                          );
                                        }
                                        this.setCopy(copy)
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
        
                <View style={styles.animatedBox}>
                        {ImageBox}
                        <TouchableOpacity onPress={() => {this.store.toggleOpen()}}
                            style={{
                                backgroundColor: this.store.icon,
                                textAlign:'center',
                                position: 'absolute',
                                right: -70,
                                width: 70,
                                height: 60,
                                top: 30,
                                borderTopRightRadius: 100,
                                borderBottomRightRadius: 100,
                            }}>
                                <Icon
                                    size={40}
                                    name="image"
                                    color={this.store.text}
                                    style={styles.icon}
                                />
                        </TouchableOpacity>
                </View>

          
        );
      };

    render() {
        return (
        <View>
               <View style={styles.container}>
                    <MenuDrawer 
                    open={this.store.open} 
                    drawerContent={this.drawerContent()}
                    drawerPercentage={20}
                    animationTime={250}
                    overlay={false}
                    opacity={0}
                    >
                    </MenuDrawer>

                </View>
                <View style={styles.screen}>
                    {this.state.copy}
                </View>
        </View>
        )
    }
}

const styles = StyleSheet.flatten({
    container: {
        flex: 1,
        height:'100%',
    },
    animatedBox: {
        height: '86%',
        top: -5,
        backgroundColor: '#d4d2d2',
        position: 'relative',
    },
    icon: {
        position: 'relative',
        top: 9,
        left: 9,
    },
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
    screen: {
        position: 'absolute',
        backgroundColor: "#f6f6f6",
        borderColor: "#888888",
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 15,
        right: 100,
      },
})