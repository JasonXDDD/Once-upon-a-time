import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { inject, observer } from 'mobx-react'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Gestures from 'react-native-easy-gestures'
import ImagesArrary from './imagesArrary'
import Sticker from './stick/sticker'


@inject('rootStore')
@observer
export default class ToolBar extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
    } 

    render() {
        return (
        <View style={styles.container}>  

                <View style={{ 
                    width: 135,
                    height: '100%',
                    backgroundColor: '#3776b1',
                    left: this.store.meterial,
                    }}>  
                    <ImagesArrary {...this.props} />  
                    <TouchableOpacity onPress={() => {this.store.toggleOpen()}}
                        style={{
                            textAlign:'center',
                            position: 'absolute',
                            right: -54,
                            top: 30,
                        }}>
                        <Image
                        source={this.store.text}
                        style={styles.icon}/>
                    </TouchableOpacity>
                </View>

                <View style={{ 
                    width: 135,
                    height: '100%',
                    backgroundColor: '#3e97a5',
                    left: this.store.stick,
                    }}>  
                    <Sticker />
                    <TouchableOpacity onPress={() => {this.store.StickToggleOpen()}}
                        style={{
                            display: this.store.visibal,
                            textAlign:'center',
                            position: 'absolute',
                            right: -54,
                            top: 100,
                        }}>
                        <Image
                        source={this.store.StickText}
                        style={styles.icon}/>
                    </TouchableOpacity>   
                </View>

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
    icon: {
        position: 'relative',
        width: 54,
        height: 54,
    },
})