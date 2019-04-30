import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { inject, observer } from 'mobx-react';
import MenuDrawer from 'react-native-side-drawer'


@inject('rootStore')
@observer
export default class ToolBar extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
        this.state = {
            open: false,
            liked: false,
            bgliked: true,
          };
      }





      toggleOpen = () => {
        this.setState({ open: !this.state.open, liked: !this.state.liked, bgliked: this.state.bgliked});
      };
    
      drawerContent = () => {
        return (
          <View style={styles.animatedBox}>
            <Text onPress={this.toggleOpen}>Close</Text>
          </View>
        );
      };

    render() {
        const text = this.state.liked ? "#656464":"#d4d4d4";
        const icon = this.state.liked ? "#d4d4d4":"#656464";
        return (
            
    <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={false}
          opacity={0}
        >
        </MenuDrawer>
                <View style={styles.images}>
                <Text onPress={this.toggleOpen} style={{width: '100%',textAlign:'center',backgroundColor: icon}}>
                    <Icon
                        size={60}
                        name="image"
                        color={text}
                        style={[styles.icon]}
                    />
                </Text>
                    <Icon
                        size={65}
                        name="plus-circle"
                        color='#d4d4d4'
                        style={[styles.icon]}
                    />
                </View>

                <View style={styles.images}>
                <Icon
                        size={60}
                        name="save"
                        color='#d4d4d4'
                        style={[styles.icon]}
                    />
                    <Icon
                        size={55}
                        name="video-camera"
                        color='#d4d4d4'
                        style={[styles.icon]}
                    />                    
                </View>
    </View>



        )
    }
}

const styles = StyleSheet.flatten({
    container: {
        width: 100,
        height: '95%',
        backgroundColor: '#656464',
        justifyContent: 'space-between',       
      },
    images: {
        height: '30%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    icon: {
        margin: 0,
        
    },
    animatedBox: {
        width: '40%',
        height: '100%',
        backgroundColor: '#d4d2d2',
        position: 'absolute',
        left: 100,
        top: -5,
    }
})