import { observable, action } from "mobx";


export default class StoryStore {
	@observable isRecord = false;
	@observable onLive = false;

	@observable count = 0;
	@observable countdownid = {};
	
	@observable story = [];
	@observable selectSceneIndex = 0;
	@observable storyScene = [
		{story: []},
		{story: []},
		{story: []}
	];

	@observable openScenePane = true;



	@action
	removeItem(key){
		this.storyScene[this.selectSceneIndex].story.splice(
			this.storyScene[this.selectSceneIndex].story.indexOf(
				this.storyScene[this.selectSceneIndex].story.filter(ele => ele.key === key)
			[0]), 
		1)
	}
}