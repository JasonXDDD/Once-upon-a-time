import { observable, action, autorun } from "mobx";

import BtnSceneUnselected from '../assets/images/EditStory/Btn_Material_Unselected.png'
import BtnSceneSelected from '../assets/images/EditStory/Btn_Material_Selected.png'
import BtnCharacterUnselected from '../assets/images/EditStory/Btn_Material_Unselected.png'
import BtnCharacterSelected from '../assets/images/EditStory/Btn_Material_Selected.png'
import BtnStickerUnselected from '../assets/images/EditStory/Btn_Sticker_Unselected.png'
import BtnStickerSelected from '../assets/images/EditStory/Btn_Sticker_Selected.png'

import Forest from '../assets/images/Forest.png'
import Room from '../assets/images/Room.png'
import BigMonster from '../assets/images/BigMonster.png'
import SmallMoster from '../assets/images/smallMoster.png'
import Sun from '../assets/images/Sun.png'
import Simpson from '../assets/images/simpson.png'

export default class ToolStore {
	@observable sceneBtn = BtnSceneUnselected;
  @observable characterBtn = BtnCharacterUnselected;
  @observable stickerBtn = BtnStickerUnselected;
  @observable open = '';

  @observable scenePane = -135;

  @observable scene = [
    {
      id: 'Forest',
      image: Forest
    },
    {
      id: 'Room',
      image: Room
    }
  ];

  @observable character = [
    {
      id: 'Sun',
      image: Sun
    },
    {
      id: 'BigMonster',
      image: BigMonster
    },
    {
      id: 'SmallMoster',
      image: SmallMoster
    }
  ];

  @observable sticker = [
    {
      id: 'Simpson',
      image: Simpson
    }
  ]

  
  @action
  toggleOpen(type) {
    if(this.open === type){
      this.open = '';
      return;
    }
    
    console.log('hello ' + type + this.open);
    this.open = type;
    this.sceneBtn = this.open === type? BtnSceneSelected : BtnSceneUnselected;
    this.characterBtn = this.open === type? BtnCharacterSelected : BtnCharacterUnselected;
    this.stickerBtn = this.open === type? BtnStickerSelected : BtnStickerUnselected;
  }

}
