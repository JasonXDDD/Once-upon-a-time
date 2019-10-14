import  StoryStore  from "./story";
import  ToolStore  from "./tool";
import  SoundStore  from "./sound";
import  BoxStore  from "./box";

const storyStore = new StoryStore();
const toolStore = new ToolStore();
const soundStore = new SoundStore();
const boxStore = new BoxStore();


export { storyStore, toolStore, soundStore, boxStore }