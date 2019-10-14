import { observable, action } from "mobx";
import Sound from 'react-native-sound';
import { Alert } from "react-native";

import Background_Music from "../assets/sound/Rainbow_Forest.mp3";
import TabBar_Click from "../assets/sound/button-tab.mp3";
import Button_Click from "../assets/sound/button-click.mp3";
import Delete_Click from "../assets/sound/button-delete.mp3";
import Pop_Click from "../assets/sound/button-pop.wav";
import Long_Press_Click from "../assets/sound/button-long-press.mp3";
import Bubble from "../assets/sound/bubble.wav";
import ToolBar_Click from "../assets/sound/bloop-noise.wav";
import DrawColor_Click from "../assets/sound/bloop-noise.wav";
import BGM_Open from "../assets/sound/bgm-open.wav";
import BGM_Close from "../assets/sound/bgm-close.wav";

import g3 from "../assets/sound/piano/g3.wav";
import a3 from "../assets/sound/piano/a3.wav";
import b3 from "../assets/sound/piano/b3.wav";
import c4 from "../assets/sound/piano/c4.wav";
import d4 from "../assets/sound/piano/d4.wav";
import e4 from "../assets/sound/piano/e4.wav";
import f4 from "../assets/sound/piano/f4.wav";
import g4 from "../assets/sound/piano/g4.wav";
import a4 from "../assets/sound/piano/a4.wav";
import b4 from "../assets/sound/piano/b4.wav";
import c5 from "../assets/sound/piano/c5.wav";
import d5 from "../assets/sound/piano/d5.wav";


export default class SoundStore {
	@observable soundPlayer;
	@observable soundList = {
    bgm: Background_Music,
    tab: TabBar_Click,
    tool: ToolBar_Click,
    tool_item: Bubble,
    button: Button_Click,
    delete: Delete_Click,
    add: Pop_Click,
    box: Pop_Click,
    long_press: Long_Press_Click,
    draw_color: DrawColor_Click,
    piano_g3: g3,
    piano_a3: a3,
    piano_b3: b3,
    piano_c4: c4,
    piano_d4: d4,
    piano_e4: e4,
    piano_f4: f4,
    piano_g4: g4,
    piano_a4: a4,
    piano_b4: b4,
    piano_c5: c5,
    piano_d5: d5,
    bgm_open: BGM_Open,
    bgm_close: BGM_Close
  };

  @observable bgmPlayer = this.genMusic('bgm')
  @observable isBgm = true
  
  prePlayer;
	@action
	genMusic(key){
    return new Sound(this.soundList[key], (error)=> {
      if(error) Alert.alert("音樂播放失敗")
    })
  }
  genMusicBySound(sound){
    return new Sound(sound, error => {
      if(error) Alert.alert("音樂播放失敗")
    })
  }

  @action
  playMusic(player, vol, loop){
    player.setVolume(vol);
    player.setNumberOfLoops(loop);
    player.play((success) => {
      console.log("play music")
    })
  }

  @action
  playSoundEffect(player, vol, loop, callback){
    //clear prev player for playing quickly
    if(this.prePlayer) this.prePlayer.stop()
    
    player.setVolume(vol);
    player.setNumberOfLoops(loop);
    player.play((success) => {
      console.log("play sound effect")
    })

    this.prePlayer = player

    if(callback) callback()
  }
}