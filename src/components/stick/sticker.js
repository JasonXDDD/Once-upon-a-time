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
    findNodeHandle,
    setNativeProps } from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable, autorun, action } from 'mobx'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Gestures from 'react-native-easy-gestures'

import MaterialIconCharacter from '../../assets/images/EditStory/Material_Icon_Character.png'
import Simpson from '../../assets/images/simpson.png'
  
@inject('rootStore')
@observer
export default class Sticker extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
    } 
    
      



    render() {
        return (
            <View>        
                <Collapse>
                <CollapseHeader>
                    <Separator bordered style={styles.tabTitle}>
                    <Image 
                    source={MaterialIconCharacter}
                    style={styles.drawerIcon} />
                    <Text style={styles.tabText}>貼紙</Text>
                    </Separator>
                </CollapseHeader>
                <CollapseBody style={styles.imagesArrary}>
                <ListItem style={{borderBottomWidth: 0}} onPressIn={() => {this.store.addMore(Simpson)}}>
                        <Image
                        style={{ width: 78, height: 78,}}
                        source={Simpson}
                        />                   
                </ListItem>
                </CollapseBody>
                </Collapse>
            </View>
        )
    }
}


const styles = StyleSheet.flatten({
tabTitle: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 18, 
},
drawerIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 35,
    },
tabText: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    left: 62,
    color: '#000',
    position: 'absolute',
},
imagesArrary: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',  
    marginTop: 18,   
},
})