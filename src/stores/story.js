import { observable, action } from "mobx";


export default class StoryStore {
	@observable isRecord = false;
	
	@observable story = [];
	@observable storyScene = {
		scene: {},
		item: []
	}

	@observable containerView;
	@observable innerView = [];

	@action
	removeItem(key){
		this.story.splice(this.story.indexOf(this.story.filter(ele => ele.key === key)[0]), 1)
	}
}