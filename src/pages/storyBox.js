
import React, {Component} from 'react';
import {Platform, Dimensions, StyleSheet, Alert, Text, View, Image, Modal, TouchableOpacity, TouchableHighlight, ImageBackground} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import { inject, observer } from "mobx-react";
import Coverflow from 'react-native-coverflow';
import { observe } from 'mobx';


import StoryBox_BG from '../assets/images/StoryBox/BG.png'
import BoxTool from '../components/box/boxTool'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


@inject("rootStore")
@observer
export default class StoryBox extends React.Component {
	buttonPlayer;

	state = {
		modalVisible: false,
	};
	
	constructor(props) {
		super(props);
    this.storyStore = props.rootStore.storyStore;
		this.soundStore = props.rootStore.soundStore;
		this.boxStore = props.rootStore.boxStore;
	}

  async componentDidMount() {
		await this.boxStore.getVideo()
		this.buttonPlayer = this.soundStore.genMusic('box')

		//set when siri change route
		if(this.storyStore.shortcutInfo != null){
			setTimeout(() => {
				this.playVideo(this.boxStore.videoList[0])
			}, 1000)
		}
    observe(this.storyStore, 'shortcutInfo',(change)=> {
      if(JSON.parse(change.newValue).say === 'story'){
        setTimeout(() => {
					this.playVideo(this.boxStore.videoList[0])
				}, 1000)
			}
    })
	}


	playVideo(data){
		this.boxStore.selectVideo = data
		this.setState({modalVisible: true});
		this.soundStore.playBGM(false)
	}


	renderVideo(){
		const res = []
		this.boxStore.videoList.forEach(ele => {
			res.push(
				<View key={ele.time} style={{
					marginHorizontal: 20, 
					justifyContent: "center"
				}}>
					
					<Image source={ele.name === 'Sample'? ele.image: {uri: ele.image}} style={[styles.videoItem, {
						borderColor: "#32c9ff",
						borderWidth: this.boxStore.selectVideo.name === ele.name? 3: 0
					}]}></Image>
					<View style={styles.videoTextPane}>
						<Text style={styles.videoText}>{ele.time}</Text>
					</View>
				</View>
			)
		})

		return res;
	}

  render() {
    return (

			<ImageBackground source={StoryBox_BG} style={{ flex: 1, justifyContent: 'center' }}>

				{/*video list*/}
				<Coverflow style={{paddingHorizontal: 100, marginBottom: 200}}
					onChange={(index) => {
						this.boxStore.selectVideo = this.boxStore.videoList[index]
						this.boxStore.selectVideoIndex = index
						this.soundStore.playSoundEffect(this.buttonPlayer, 1, 0)
					}}
					onPress={(index) => {
						this.playVideo(this.boxStore.videoList[index])
					}}
					initialSelection={0}
					spacing={250}
					wingSpan={80}
					rotation={50}
					midRotation={10}
					perspective={1000}
					scaleDown={0.7}
					scaleFurther={0.7}>

					{ this.renderVideo()}
				</Coverflow>
			

				{/* movie modal */}
				<Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
					
					<VideoPlayer 
						source={this.boxStore.selectVideo.name === 'Sample'? this.boxStore.selectVideo.video: {uri: this.boxStore.selectVideo.video}}
						onBack={() => {
							this.setState({modalVisible: false});
							
							//play bgm
							this.soundStore.playBGM(true)

						}}/> 

        </Modal>


				{/* tool */}
				<BoxTool selectVideo={this.boxStore.selectVideo}></BoxTool>
			</ImageBackground>
			
    );
  }
}

const styles = StyleSheet.create({
	videoSelect: {
		borderWidth: 8,
		borderColor: '#aabbcc'
	},

	videoItem: {
		borderRadius: 10, 
		width: 600,  
		height: 395,
		borderColor: "#bebebe",
		borderWidth: 1 
	},

	videoTextPane: {
		width: 600,
		backgroundColor: '#000000AA',
		paddingVertical: 15,
		marginTop: -55,

		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
	},

	videoText: {
		fontSize: 20,
		color: '#FFFFFF',
		textAlign: 'center',
	},

	backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
		width: screenWidth,
		height: screenHeight
  },
});