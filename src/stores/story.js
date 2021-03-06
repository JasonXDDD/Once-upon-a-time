import { observable, action, observe } from "mobx";


export default class StoryStore {
	@observable isRecord = false;
	@observable onLive = false;

	@observable count = 0;
	@observable countdownid = {};
	
	@observable story = [];
	@observable selectSceneIndex = 0;
	@observable storyScene = [
		{story: [], music: []},
		{story: [], music: []},
		{story: [], music: []}
	];

	@observable selectMusic = '';

	@observable openScenePane = true;

	//for sirikit
	@observable shortcutInfo = null;
	@observable shortcutActivityType = null;


	@action
	removeItem(key){
		this.storyScene[this.selectSceneIndex].story.splice(
			this.storyScene[this.selectSceneIndex].story.indexOf(
				this.storyScene[this.selectSceneIndex].story.filter(ele => ele.key === key)
			[0]), 
		1)
	}

	@action
	removeMusicItem(key){
		this.storyScene[this.selectSceneIndex].music.splice(
			this.storyScene[this.selectSceneIndex].music.indexOf(
				this.storyScene[this.selectSceneIndex].music.filter(ele => ele.key === key)
			[0]), 
		1)
	}
}