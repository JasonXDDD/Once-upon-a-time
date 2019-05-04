import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { inject, observer } from 'mobx-react'
import MenuDrawer from 'react-native-side-drawer'
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
                <ImagesArrary />
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
                    animationTime={250}
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
    }
})