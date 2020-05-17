import { observable, action } from "mobx";
import Sound from 'react-native-sound';
import { Alert } from "react-native";
import { RES } from "../core/resource";


export default class SoundStore {
	@observable soundPlayer;
	@observable soundList = {
    bgm: RES.Background_Music,
    tab: RES.TabBar_Click,
    tool: RES.ToolBar_Click,
    tool_item: RES.Bubble,
    button: RES.Button_Click,
    delete: RES.Delete_Click,
    add: RES.Pop_Click,
    box: RES.Pop_Click,
    long_press: RES.Long_Press_Click,
    draw_color: RES.DrawColor_Click,
    piano_g3: RES.g3,
    piano_a3: RES.a3,
    piano_b3: RES.b3,
    piano_c4: RES.c4,
    piano_d4: RES.d4,
    piano_e4: RES.e4,
    piano_f4: RES.f4,
    piano_g4: RES.g4,
    piano_a4: RES.a4,
    piano_b4: RES.b4,
    piano_c5: RES.c5,
    piano_d5: RES.d5,
    bgm_open: RES.BGM_Open,
    bgm_close: RES.BGM_Close
  };

  @observable bgmPlayer = this.genMusic('bgm')
  @observable isBgm = true
  
  @action
  playBGM(isPlay){
    if(isPlay){
      setTimeout(() => {
        this.playMusic(this.bgmPlayer, 0.4, -1)
      }, 1000)
    }
    else {
      this.bgmPlayer.stop()
    }
    this.isBgm = isPlay

  }


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