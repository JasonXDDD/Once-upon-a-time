import { observable, action } from 'mobx'
import { observer } from "mobx-react";
import Girl from './../../src/assets/images/girl.png'
import Night from './../../src/assets/images/night.jpg'
import { Alert } from 'react-native'


class AppStore {
  //tool-bar
  @observable
  open = false

  @observable
  pressButton = false

  @observable
  text = '#ffffff'

  @observable
  icon = '#00137b'  

  @observable
  rightDirection = 100

  @action
  toggleOpen() {
    this.open = !this.open
    this.pressButton = !this.pressButton
    this.text = this.pressButton ? "#00137b":"#ffffff";
    this.icon = this.pressButton ? "#ffffff":"#00137b";
    this.rightDirection = this.pressButton ? -100 : 100;
  }
  //imagesArrary
  @observable
    list = [{
            id: 'scenes',
            title: '場景',
            content: [{
              id: 'outside',
              image: Night,
            },{
              id: 'inside',
              image: Night,
            }]
    },{
            id: 'character',
            title: '人物',
            content: [{
              id: 'girl',
              image: Girl,
            },{
              id: 'boy',
              image: Girl,
            }]
    }]

  @action
  selectImage(key) {

    Alert.alert(
      '確定要刪除 ' + key + ' 嗎？',
      ' ',
      [
        {text: '確定', onPress: () => console.log('確定')},
        {text: '取消', onPress: () => console.log('取消')},
      ],
      { cancelable: false }
    )    

  }  


  
}

const appStore = new AppStore()
export {appStore}
