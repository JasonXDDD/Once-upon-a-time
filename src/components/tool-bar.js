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
    } 
  
      drawerContent = () => {
        return (
                <View style={styles.animatedBox}>
                        <ImagesArrary {...this.props} />
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
        <View style={styles.container}>
                <MenuDrawer 
                    open={this.store.open} 
                    drawerContent={this.drawerContent()}
                    drawerPercentage={20}
                    animationTime={180}
                    overlay={false}
                    opacity={0}
                    >
                </MenuDrawer>
        </View>
        )
    }
}

const styles = StyleSheet.flatten({
    container: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'flex-start',
       textAlign: 'center',
    },
    animatedBox: {
        height: '86%',
        top: -5,
        backgroundColor: '#d4d2d2',
    },
    imagesArrary: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',    
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
})