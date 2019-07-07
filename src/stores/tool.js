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

import BigMonster from "../assets/images/character/BigMonster.png";
import SmallMoster from "../assets/images/character/smallMoster.png";
import Sun from "../assets/images/character/Sun.png";
import Redhat from "../assets/images/character/redhat.png";
import Hunter from "../assets/images/character/hunter.png";
import Bee from "../assets/images/character/bee.png";
import Grandma from "../assets/images/character/grandma.png";
import Wolf from "../assets/images/character/wolf.png";

import Simpson from "../assets/images/simpson.png";

export default class ToolStore {
  @observable sceneBtn = BtnSceneUnselected;
  @observable characterBtn = BtnCharacterUnselected;
  @observable stickerBtn = BtnStickerUnselected;
  @observable open = "";

  @observable scenePane = -135;

  @observable scene = [
    {
      id: "Forest",
      image: Forest
    },
    {
      id: "Room",
      image: Room
    },
    {
      id: "Outside",
      image: Outside
    }
  ];

  @observable character = [
    {
      id: "Sun",
      image: Sun
    },
    {
      id: "BigMonster",
      image: BigMonster
    },
    {
      id: "SmallMoster",
      image: SmallMoster
    },
    {
      id: "Bee",
      image: Bee
    },
    {
      id: "RedHat",
      image: Redhat
    },
    {
      id: "Hunter",
      image: Hunter
    },
    {
      id: "grandma",
      image: Grandma
    },
    {
      id: "Wolf",
      image: Wolf
    }
  ];

  @observable sticker = [
    {
      id: "Simpson",
      image: Simpson
    }
  ];

  @observable drawItem = {};

  @action
  toggleOpen(type) {
    if (this.open === type) {
      this.open = "";
      return;
    }

    console.log("hello " + type + this.open);
    this.open = type;
    this.sceneBtn = this.open === type ? BtnSceneSelected : BtnSceneUnselected;
    this.characterBtn =
      this.open === type ? BtnCharacterSelected : BtnCharacterUnselected;
    this.stickerBtn =
      this.open === type ? BtnStickerSelected : BtnStickerUnselected;
  }
}
