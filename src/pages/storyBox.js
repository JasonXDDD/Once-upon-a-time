
import React, {Component} from 'react';
import {Platform, Dimensions, StyleSheet, Alert, Text, View, Image, Modal, TouchableOpacity, TouchableHighlight, FlatList, CameraRoll, ImageBackground} from 'react-native';
import RNFS from 'react-native-fs';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import moment from 'moment';
import { inject, observer } from "mobx-react";

import StoryBox_BG from '../assets/images/StoryBox/BG.png'
import BoxTool from '../components/box/boxTool'
import { observe } from 'mobx';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


@inject("rootStore")
@observer
export default class StoryBox extends React.Component {
	state = {
		images: [],
		modalVisible: false,
		selectVideo: ''
	};
	
	constructor(props) {
		super(props);
    this.storyStore = props.rootStore.storyStore;
    this.soundStore = props.rootStore.soundStore;
	}

  async componentDidMount() {
		await this.getVideo()

		//set when siri change route
		if(this.storyStore.shortcutInfo != null){
			setTimeout(() => {
				this.setState({selectVideo: this.state.images[1]})
				this.setModalVisible(true)
			}, 1000)
		}
    observe(this.storyStore, 'shortcutInfo',(change)=> {
      if(JSON.parse(change.newValue).say === 'story'){
        setTimeout(() => {
					this.playVideo(this.state.images[1])
				}, 1000)
			}
    })
	}

	playVideo(data){
		this.setState({selectVideo: data})
		this.setModalVisible(true)

		if(this.soundStore.isBgm){
			this.soundStore.bgmPlayer.stop()
			this.soundStore.isBgm = false
		}
	}

	setModalVisible(visible) {
    this.setState({modalVisible: visible});
	}

	async getVideo(){
		let image = await this.getCameraRoll()
		let movie = await this.getFS()
		let ans = [{
			name: 'Sample',
			image: 'https://i.imgur.com/rHcCdWb.png',
			video: 'http://cdn-b-east.streamable.com/video/mp4-mobile/jutsg.mp4?token=8WCMXM-enmW3EMLP7oUaxA&expires=1570431300',
			time: 'SAMPLE 2019年 07月 16日 17:45'
		}]

		image.forEach(item => {
			let tmp = movie.filter(ele => {
				return ele.time === item.time
			})

			if(tmp.length){
				ans.push({
					name: tmp[0].name,
					image: item.path,
					video: tmp[0].path,
					time: moment(item.time * 1000).format('YYYY年 MM月 DD日 HH:mm')
				})
			}
		})

		// console.log(ans);
		// console.log(image.length, movie.length, ans.length)

		this.setState({images: ans})
	}

	async getFS(){
		return await RNFS.readDir('//private/var/mobile/Media/DCIM/100APPLE')
		.then((result) => {
			return Promise.all(result.map(ele => {
				return {
					name: ele.name,
					path: ele.path,
					time: Math.floor(new Date(ele.ctime).valueOf()/1000)
				}
			}));
		})
		.then((statResult) => {
			let arr = [...new Set(statResult.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
			return arr;
		})
		.catch((err) => {
			console.log(err.message, err.code);
		});
	}
	
	async getCameraRoll(){
		return await CameraRoll.getPhotos({
      first: 13,
      groupTypes: "All",
      assetType: "Videos",
    })
    .then((data) => {
			let format = data.edges.map(ele => ({
				name: ele.node.timestamp,
				path: ele.node.image.uri,
				time: ele.node.timestamp
			}));
			let arr = [...new Set(format.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
			return arr;
		});
	}

  render() {
    return (

			<ImageBackground source={StoryBox_BG} style={{ flex: 1, justifyContent: 'center' }}>

				{/*video list*/}
				<View style={{paddingHorizontal: 100, marginBottom: 200}}>
					<FlatList
						horizontal={true}
						data={this.state.images}
						keyExtractor={(item, id) => JSON.stringify(item)}
						renderItem={({item}) => (
							
							<TouchableOpacity style={{
								marginHorizontal: 20, 
								justifyContent: "center",
							}}
							onPress={() => {
								this.playVideo(item)
							}}
							onLongPress={() => {
								this.setState({selectVideo: item})
							}}>
								<Image source={{uri: item.image}} style={[styles.videoItem]}></Image>
								<View style={styles.videoTextPane}>
									<Text style={styles.videoText}>{item.time}</Text>
								</View>
							</TouchableOpacity>

						)}
					/>
				</View>
							
				{/* movie modal */}
				<Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
					
					<VideoPlayer 
						source={{uri: this.state.selectVideo.video}}
						onBack={() => {
							this.setModalVisible(!this.state.modalVisible);
							
							//play bgm
							this.soundStore.playMusic(this.soundStore.bgmPlayer, 0.4, -1)
            	this.soundStore.isBgm = true
						}}/> 

        </Modal>


				{/* tool */}
				<TouchableOpacity 
				style={{alignItems: "flex-end", marginTop: 0}} 
				onPress={() => { 
					this.getVideo() 
				}}>
					<Text> Reload </Text>
				</TouchableOpacity>

				<BoxTool selectVideo={this.state.selectVideo}></BoxTool>
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