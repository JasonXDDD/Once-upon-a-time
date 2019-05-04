import {observable, action} from 'mobx'
import Girl from './../../src/assets/images/girl.png'
import Night from './../../src/assets/images/night.jpg'
import { captureRef, captureScreen } from "react-native-view-shot";
import Gestures from 'react-native-easy-gestures'



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

  @action
  toggleOpen() {
    this.open = !this.open
    this.pressButton = !this.pressButton
    this.text = this.pressButton ? "#00137b":"#ffffff";
    this.icon = this.pressButton ? "#ffffff":"#00137b";
  }
  //imagesArrary
  @observable
    list = [{
            id: 1,
            title: '場景',
            content: [{
              id: 1,
              image: Night,
            },{
              id: 2,
              image: Night,
            }]
    },{
            id: 2,
            title: '人物',
            content: [{
              id: 1,
              image: Girl,
            },{
              id: 2,
              image: Girl,
            }]
    }]


  @observable    
  copy = []

  @observable
  count = 0 


  @action
  setCopy(data){
    this.copy = data
  }
  



}

const appStore = new AppStore()
export {appStore}
