import { observable, action, autorun } from "mobx";

import BtnSceneUnselected from "../assets/images/EditStory/Btn_Material_Unselected.png";
import BtnSceneSelected from "../assets/images/EditStory/Btn_Material_Selected.png";
import BtnCharacterUnselected from "../assets/images/EditStory/Btn_Character_Unselected.png";
import BtnCharacterSelected from "../assets/images/EditStory/Btn_Character_Selected.png";
import BtnStickerUnselected from "../assets/images/EditStory/Btn_Sticker_Unselected.png";
import BtnStickerSelected from "../assets/images/EditStory/Btn_Sticker_Selected.png";
import BtnMusicSelected from "../assets/images/EditStory/Btn_Music_Selected.png";
import BtnMusicUnselected from "../assets/images/EditStory/Btn_Music_Unselected.png";

import Forest from "../assets/images/scene/Forest.png";
import Room from "../assets/images/scene/Room.png";
import Outside from "../assets/images/scene/Outside.png";
import Camera from "../assets/images/scene/Camera.png";
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
import musicItem from "../assets/images/music-item.png";

import Happy from "../assets/sound/scene/Rainbow_Forest.mp3";
import Desert from "../assets/sound/scene/Desert_Caravan.mp3";
import War from "../assets/sound/scene/Eyes_of_Glory.mp3";
import Suspense from "../assets/sound/scene/Carol_of_the_Bells.mp3";
import Thunder from "../assets/sound/scene/Thunder_Crack.mp3";

export default class ToolStore {
  @observable sceneBtn = BtnSceneUnselected;
  @observable characterBtn = BtnCharacterUnselected;
  @observable stickerBtn = BtnStickerUnselected;
  @observable musicBtn = BtnMusicUnselected;
  @observable open = "";
  @observable selectIndex = -1;
  @observable isAnimate = [false, false, false];

  @observable scenePane = -135;

  @observable scene = [
    {
      id: "叢林",
      image: Forest,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "房間",
      image: Room,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "奶奶家",
      image: Outside,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "相機",
      image: Camera,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "付費解鎖1",
      image: sLock01,
      animate: null,
      isLock: true,
      isAnimate: false
    },
    {
      id: "付費解鎖2",
      image: sLock02,
      animate: null,
      isLock: true,
      isAnimate: false
    },
    {
      id: "付費解鎖3",
      image: sLock03,
      animate: null,
      isLock: true,
      isAnimate: false
    }
  ];

  @observable character = [
    {
      id: "太陽",
      image: Sun,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "從從",
      image: BigMonster,
      animate: BigMonsterAnimate,
      isLock: false,
      isAnimate: false
    },
    {
      id: "前前",
      image: SmallMoster,
      animate: SmallMosterAnimate,
      isLock: false,
      isAnimate: false
    },
    {
      id: "蜜蜂",
      image: Bee,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "小紅帽",
      image: Redhat,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "獵人",
      image: Hunter,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "阿嬤",
      image: Grandma,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "狼",
      image: Wolf,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "付費解鎖",
      image: cLock01,
      animate: null,
      isLock: true,
      isAnimate: false
    }
  ];

  @observable sticker = [
    {
      id: "小恐龍",
      image: stickerSample,
      animate: null,
      isLock: false,
      isAnimate: false
    }
  ];

  @observable music = [
    {
      id: "歡樂",
      image: musicItem,
      sound: Happy,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "沙漠",
      image: musicItem,
      sound: Desert,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "打仗",
      image: musicItem,
      sound: War,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "懸疑",
      image: musicItem,
      sound: Suspense,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "晴天霹靂",
      image: musicItem,
      sound: Thunder,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
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
    this.musicBtn =     this.open === 'music'     ? BtnMusicSelected : BtnMusicUnselected;
  }
}
