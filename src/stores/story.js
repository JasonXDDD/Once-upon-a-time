import { observable, action } from "mobx";


export default class StoryStore {
	@observable story = [];
	@observable storyScene = {
		scene: {},
		item: []
	}

	@observable containerView;
	@observable innerView = [];

	@action
	removeItem(id){
		this.story.splice(id, 1)
	}
}