import { observable, action, autorun } from "mobx";
import { RES } from "../core/resource";

export default class ToolStore {
  @observable sceneBtn = RES.BtnSceneUnselected;
  @observable characterBtn = RES.BtnCharacterUnselected;
  @observable stickerBtn = RES.BtnStickerUnselected;
  @observable musicBtn = RES.BtnMusicUnselected;
  @observable open = "";
  @observable selectIndex = -1;
  @observable isAnimate = [false, false, false];

  @observable scenePane = -135;

  @observable scene = [
    {
      id: "叢林",
      image: RES.Forest,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "房間",
      image: RES.Room,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "奶奶家",
      image: RES.Outside,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "相機",
      image: RES.CameraItem,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "付費解鎖1",
      image: RES.sLock01,
      animate: null,
      isLock: true,
      isAnimate: false
    },
    {
      id: "付費解鎖2",
      image: RES.sLock02,
      animate: null,
      isLock: true,
      isAnimate: false
    },
    {
      id: "付費解鎖3",
      image: RES.sLock03,
      animate: null,
      isLock: true,
      isAnimate: false
    }
  ];

  @observable character = [
    {
      id: "太陽",
      image: RES.Sun,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "從從",
      image: RES.BigMonster,
      animate: RES.BigMonsterAnimate,
      isLock: false,
      isAnimate: false
    },
    {
      id: "前前",
      image: RES.SmallMoster,
      animate: RES.SmallMosterAnimate,
      isLock: false,
      isAnimate: false
    },
    {
      id: "元元",
      image: RES.People1,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "小漢",
      image: RES.People2,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "小清",
      image: RES.People3,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "阿民",
      image: RES.People4,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "蜜蜂",
      image: RES.Bee,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "小紅帽",
      image: RES.Redhat,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "獵人",
      image: RES.Hunter,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "阿嬤",
      image: RES.Grandma,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "狼",
      image: RES.Wolf,
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "付費解鎖",
      image: RES.cLock01,
      animate: null,
      isLock: true,
      isAnimate: false
    }
  ];

  @observable sticker = [
    {
      id: "小恐龍",
      image: RES.stickerSample,
      animate: null,
      isLock: false,
      isAnimate: false
    }
  ];

  @observable music = [
    {
      id: "歡樂",
      image: RES.musicItem,
      sound: RES.Happy,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "沙漠",
      image: RES.musicItem,
      sound: RES.Desert,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "打仗",
      image: RES.musicItem,
      sound: RES.War,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "懸疑",
      image: RES.musicItem,
      sound: RES.Suspense,
      player: {},
      animate: null,
      isLock: false,
      isAnimate: false
    },
    {
      id: "晴天霹靂",
      image: RES.musicItem,
      sound: RES.Thunder,
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
    this.sceneBtn =     this.open === 'scene'     ? RES.BtnSceneSelected : RES.BtnSceneUnselected;
    this.characterBtn = this.open === 'character' ? RES.BtnCharacterSelected : RES.BtnCharacterUnselected;
    this.stickerBtn =   this.open === 'sticker'   ? RES.BtnStickerSelected : RES.BtnStickerUnselected;
    this.musicBtn =     this.open === 'music'     ? RES.BtnMusicSelected : RES.BtnMusicUnselected;
  }
}
