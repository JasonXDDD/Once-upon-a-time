import { observable, action, autorun } from "mobx";

import BtnSceneUnselected from "../assets/images/EditStory/Btn_Material_Unselected.png";
import BtnSceneSelected from "../assets/images/EditStory/Btn_Material_Selected.png";
import BtnCharacterUnselected from "../assets/images/EditStory/Btn_Character_Unselected.png";
import BtnCharacterSelected from "../assets/images/EditStory/Btn_Character_Selected.png";
import BtnStickerUnselected from "../assets/images/EditStory/Btn_Sticker_Unselected.png";
import BtnStickerSelected from "../assets/images/EditStory/Btn_Sticker_Selected.png";

import Forest from "../assets/images/scene/Forest.png";
import Room from "../assets/images/scene/Room.png";
import Outside from "../assets/images/scene/Outside.png";
import sLock01 from "../assets/images/scene/lock01.png";
import sLock02 from "../assets/images/scene/lock02.png";
import sLock03 from "../assets/images/scene/lock03.png";

import BigMonster from "../assets/images/character/BigMonster.png";
import SmallMoster from "../assets/images/character/smallMoster.png";
import Sun from "../assets/images/character/Sun.png";
import Redhat from "../assets/images/character/redhat.png";
import Hunter from "../assets/images/character/hunter.png";
import Bee from "../assets/images/character/bee.png";
import Grandma from "../assets/images/character/grandma.png";
import Wolf from "../assets/images/character/wolf.png";
import cLock01 from "../assets/images/character/lock01.png";

import Simpson from "../assets/images/simpson.png";

export default class ToolStore {
  @observable sceneBtn = BtnSceneUnselected;
  @observable characterBtn = BtnCharacterUnselected;
  @observable stickerBtn = BtnStickerUnselected;
  @observable open = "";

  @observable scenePane = -135;

  @observable scene = [
    {
      id: "叢林",
      image: Forest
    },
    {
      id: "房間",
      image: Room
    },
    {
      id: "奶奶家",
      image: Outside
    },
    {
      id: "付費解鎖",
      image: sLock01,
      isLock: true
    },
    {
      id: "付費解鎖",
      image: sLock02,
      isLock: true
    },
    {
      id: "付費解鎖",
      image: sLock03,
      isLock: true
    }
  ];

  @observable character = [
    {
      id: "太陽",
      image: Sun
    },
    {
      id: "大從",
      image: BigMonster
    },
    {
      id: "小前",
      image: SmallMoster
    },
    {
      id: "蜜蜂",
      image: Bee
    },
    {
      id: "小紅帽",
      image: Redhat
    },
    {
      id: "獵人",
      image: Hunter
    },
    {
      id: "阿嬤",
      image: Grandma
    },
    {
      id: "狼",
      image: Wolf
    },
    {
      id: "付費解鎖",
      image: cLock01,
      isLock: true
    }
  ];

  @observable sticker = [
  ];

  @observable drawItem = {};

  @action
  toggleOpen(type) {
    if (this.open === type) 
      this.open = "";
    else
      this.open = type;


    console.log("hello " + type + this.open);
    this.sceneBtn =     this.open === 'scene'     ? BtnSceneSelected : BtnSceneUnselected;
    this.characterBtn = this.open === 'character' ? BtnCharacterSelected : BtnCharacterUnselected;
    this.stickerBtn =   this.open === 'sticker'   ? BtnStickerSelected : BtnStickerUnselected;
  }
}
