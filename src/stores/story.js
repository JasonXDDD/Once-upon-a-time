import { observable, action } from "mobx";


export default class StoryStore {
	@observable isRecord = false;
	
	@observable story = [];
	@observable selectSceneIndex = 0;
	@observable storyScene = [
		{story: []},
		{story: []},
		{story: []}
	];

	@observable openScenePane = false;



	@action
	removeItem(key){
		this.storyScene[this.selectSceneIndex].story.splice(
			this.storyScene[this.selectSceneIndex].story.indexOf(
				this.storyScene[this.selectSceneIndex].story.filter(ele => ele.key === key)
			[0]), 
		1)
	}
}