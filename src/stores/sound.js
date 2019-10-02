import { observable, action } from "mobx";
import Sound from 'react-native-sound';

import Background_Music from "../assets/sound/Rainbow_Forest.mp3";
import TabBar_Click from "../assets/sound/button.mp3";
import ToolBar_Click from "../assets/sound/bloop-noise.wav";
import DrawColor_Click from "../assets/sound/bloop-noise.wav";


export default class SoundStore {
	@observable soundPlayer;
	@observable soundList = {
    bgm: Background_Music,
    tab: TabBar_Click,
    tool: ToolBar_Click,
    draw_color: DrawColor_Click
  };


	@action
	genMusic(key){
    return new Sound(this.soundList[key], (error)=> {
      if(error) Alert.alert("音樂播放失敗")
    })
  }

  @action
  playMusic(player, vol, loop){
    player.setVolume(vol);
    player.setNumberOfLoops(loop);
    player.play((success) => {
      console.log("play")
    })
  }
}