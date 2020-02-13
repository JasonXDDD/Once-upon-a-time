import { observable, action, observe } from "mobx";
import RNFS from 'react-native-fs';
import CameraRoll from "@react-native-community/cameraroll"
import moment from 'moment';
import { RES } from "../core/resource";


export default class BoxStore {
		
    @observable videoList = [{
			name: 'Sample',
			image: RES.Sample_Image,
			video: RES.Sample_Video,
			time: 'SAMPLE 2019年 07月 16日 17:45',
		}]
		@observable selectVideo = {}
		@observable selectVideoIndex = 0


  
  @action
	async getVideo(){
		let image = await this.getCameraRoll()
    let movie = await this.getFS()
    
    //init
    this.videoList = [{
			name: 'Sample',
			image: RES.Sample_Image,
			video: RES.Sample_Video,
			time: 'SAMPLE 2019年 07月 16日 17:45',
    }]
    
		image.forEach(item => {
			let tmp = movie.filter(ele => {
				return ele.time === item.time
			})

			if(tmp.length){
				this.videoList.push({
					name: tmp[0].name,
					image: item.path,
					video: tmp[0].path,
					time: moment(item.time * 1000).format('YYYY年 MM月 DD日 HH:mm')
				})
			}
		})

		this.selectVideoIndex = 0
    this.selectVideo = this.videoList[0]
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

}