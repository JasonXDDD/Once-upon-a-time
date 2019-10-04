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
import BigMonsterAnimate from "../assets/images/character/BigMonsterAnimate.gif";
import SmallMosterAnimate from "../assets/images/character/smallMosterAnimate.gif";
import Sun from "../assets/images/character/Sun.png";
import Redhat from "../assets/images/character/redhat.png";
import Hunter from "../assets/images/character/hunter.png";
import Bee from "../assets/images/character/bee.png";
import Grandma from "../assets/images/character/grandma.png";
import Wolf from "../assets/images/character/wolf.png";
import cLock01 from "../assets/images/character/lock01.png";

import stickerSample from "../assets/images/sticker-sample.png";


export default class ToolStore {
  @observable sceneBtn = BtnSceneUnselected;
  @observable characterBtn = BtnCharacterUnselected;
  @observable stickerBtn = BtnStickerUnselected;
  @observable open = "";
  @observable selectIndex = -1;

  @observable scenePane = -135;

  @observable scene = [
    {
      id: "叢林",
      image: Forest,
      animate: null,
      isLock: false
    },
    {
      id: "房間",
      image: Room,
      animate: null,
      isLock: false
    },
    {
      id: "奶奶家",
      image: Outside,
      animate: null,
      isLock: false
    },
    {
      id: "付費解鎖1",
      image: sLock01,
      animate: null,
      isLock: true
    },
    {
      id: "付費解鎖2",
      image: sLock02,
      animate: null,
      isLock: true
    },
    {
      id: "付費解鎖3",
      image: sLock03,
      animate: null,
      isLock: true
    }
  ];

  @observable character = [
    {
      id: "太陽",
      image: Sun,
      animate: null,
      isLock: false
    },
    {
      id: "從從",
      image: BigMonster,
      animate: BigMonsterAnimate,
      isLock: false
    },
    {
      id: "前前",
      image: SmallMoster,
      animate: SmallMosterAnimate,
      isLock: false
    },
    {
      id: "蜜蜂",
      image: Bee,
      animate: null,
      isLock: false
    },
    {
      id: "小紅帽",
      image: Redhat,
      animate: null,
      isLock: false
    },
    {
      id: "獵人",
      image: Hunter,
      animate: null,
      isLock: false
    },
    {
      id: "阿嬤",
      image: Grandma,
      animate: null,
      isLock: false
    },
    {
      id: "狼",
      image: Wolf,
      animate: null,
      isLock: false
    },
    {
      id: "付費解鎖",
      image: cLock01,
      animate: null,
      isLock: true
    }
  ];

  @observable sticker = [
    {
      id: "小恐龍",
      image: stickerSample,
      animate: null,
      isLock: false
    }
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
