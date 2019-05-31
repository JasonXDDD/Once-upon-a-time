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


  
@inject('rootStore')
@observer
export default class ImagesArrary extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.appStore
        this.state = {
            copy: [], 
            x: null, 
            y: null, 
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
        this.store.x = [];
        this.store.y = [];
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
            <CollapseHeader>
                <Separator bordered style={styles.tabTitle}>
                <Image 
                source={list.icon}
                style={styles.drawerIcon} />
                <Text style={styles.tabText}>{list.title}</Text>
                </Separator>
            </CollapseHeader>                
            <CollapseBody style={styles.imagesArrary}>
            {         
                           list.content.map(content => 
                                <ListItem style={{borderBottomWidth: 0}} key={content.id} onPressIn={() => {
                                    this.store.addcount();
                                        const copy = this.state.copy;
                                        const min = 1;
                                        const max = 100;
                                        const rand = min + Math.random() * (max - min);
                                        for (let i = 0; i < 1; i++) {
                                          copy.push(
                                                <Gestures
                                                key={content.id + rand}
                                                style={{
                                                    position: 'absolute',
                                                }}>
                                                <TouchableHighlight
                                                ref={ref => this.store[`innerView${this.store.count}`] = ref}
                                                onLongPress={() => {this.selectImage(content.id + rand)}}>
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
                                    style={{ width: 78, height: 78,}}
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 18, 
    height: 28,
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