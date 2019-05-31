import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";

import Forest from "../assets/images/Forest.png";
import Room from "../assets/images/Room.png";
import BigMonster from "../assets/images/BigMonster.png";
import SmallMoster from "../assets/images/smallMoster.png";
import Sun from "../assets/images/Sun.png";
import Simpson from "../assets/images/simpson.png";

import BtnMaterialUnselected from "../assets/images/EditStory/Btn_Material_Unselected.png";
import BtnMaterialSelected from "../assets/images/EditStory/Btn_Material_Selected.png";
import BtnStickerUnselected from "../assets/images/EditStory/Btn_Sticker_Unselected.png";
import BtnStickerSelected from "../assets/images/EditStory/Btn_Sticker_Selected.png";

import MaterialIconScenes from "../assets/images/EditStory/Material_Icon_Scenes.png";
import MaterialIconCharacter from "../assets/images/EditStory/Material_Icon_Character.png";

import Btn_Recording from "../assets/images/RecordStory/Btn_Recording.png";
import Btn_Stop from "../assets/images/RecordStory/Btn_Stop.png";

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
  findNodeHandle
} from "react-native";

class AppStore {
  @observable
  teaching = "flex";

  //tool-bar

  @observable
  open = false;

  @observable
  StickOpen = false;

  @observable
  meterial = -135;

  @observable
  stick = -270;

  @observable
  visibal = "flex";

  @observable
  text = BtnMaterialUnselected;

  @observable
  StickText = BtnStickerUnselected;

  @observable
  rightDirection = 111.5;

  @observable
  undoSave = 146;

  @action
  toggleOpen() {
    this.teaching = "none";
    this.open = !this.open;
    this.meterial = this.open ? 0 : -135;
    this.text = this.open ? BtnMaterialSelected : BtnMaterialUnselected;
    this.rightDirection = this.open ? 21 : 111.5;
    this.undoSave = this.open ? 46 : 146;
    this.visibal = this.open ? "none" : "flex";
  }

  @action
  StickToggleOpen() {
    this.teaching = "none";
    this.StickOpen = !this.StickOpen;
    this.stick = this.StickOpen ? -135 : -270;
    this.StickText = this.StickOpen ? BtnStickerSelected : BtnStickerUnselected;
    this.rightDirection = this.StickOpen ? 21 : 111.5;
    this.undoSave = this.StickOpen ? 46 : 146;
  }

  //imagesArrary
  @observable
  list = [
    {
      id: "scenes",
      title: "場景",
      icon: MaterialIconScenes,
      content: [
        {
          id: "Forest",
          image: Forest
        },
        {
          id: "Room",
          image: Room
        }
      ]
    },
    {
      id: "character",
      title: "角色",
      icon: MaterialIconCharacter,
      content: [
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
        }
      ]
    }
  ];

  //Record
  @observable
  count = 0;

  @action
  addcount() {
    this.count += 1;
  }

  @observable
  save = [];

  @observable
  innerView = undefined;

  @observable
  containerView = undefined;

  @observable
  x = [];

  @observable
  y = [];

  @observable
  width = [];

  @observable
  height = [];

  @action
  positionCanvas(data) {
    this[`innerView${this.count}`].measureLayout(
      ReactNative.findNodeHandle(this.containerView),
      (xPos, yPos, Width, Height) => {
        this.x.push(xPos);
        this.y.push(yPos);
        this.width.push(Width);
        this.height.push(Height);
        this.save = data;
      }
    );
  }

  //draw

  @observable
  sticker = [];

  @action
  pushSticker(stick) {
    this.sticker = stick;
  }

  // test

  @observable
  valueArray = [];

  @observable
  index = 0;

  @observable
  image = null;

  @observable
  stickNumber = 0;

  @action
  addMore(img) {
    this.image = img;
    const newlyAddedValue = { id: "stick_" + this.valueArray.length };
    this.valueArray = [...this.valueArray, newlyAddedValue];
    this.index += 1;
    console.log(this.valueArray);
  }

  @action
  selectImage(key) {
    Alert.alert(
      "確定要刪除圖片嗎？",
      " ",
      [
        {
          text: "確定",
          onPress: () => {
            this.removeElement(key);
          }
        },
        { text: "取消", onPress: () => console.log("取消") }
      ],
      { cancelable: false }
    );
  }

  @action
  removeElement(key) {
    // const array = [...this.valueArray];
    // this.valueArray = [array[key]]
    // array.splice(key, 1, "Feb");
    this.valueArray = [
      ...this.valueArray.slice(0, key),
      ...this.valueArray.slice(key + 1)
    ];
  }
}

const appStore = new AppStore();
export { appStore };
