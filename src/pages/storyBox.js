
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, CameraRoll, ImageBackground} from 'react-native';
import RNFS from 'react-native-fs';

import StoryBox_BG from '../assets/images/StoryBox/BG.png'

export default class StoryBox extends React.Component {
	state = {
    images: [],
  };

  componentDidMount() {
    this.getVedio()
	}
	
	getVedio(){
		CameraRoll.getPhotos({
      first: 13,
      groupTypes: "All",
      assetType: "Videos",
    })
    .then((data) => {
			console.log(data.edges);
			let format = data.edges.map(ele => ({
				key: ele.node.timestamp,
				image: ele.node.image.uri
			}));
			let arr = [...new Set(format.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));

			this.setState({ images: arr })
			
		});
	}

  render() {
    return (

			<ImageBackground source={StoryBox_BG} style={{ flex: 1, justifyContent: 'center' }}>
			
			<View style={{paddingHorizontal: 100}}>
				<FlatList
					horizontal={true}
					data={this.state.images}
					keyExtractor={(item, id) => JSON.stringify(item)}
					renderItem={({item}) => (
						
						<TouchableOpacity style={{
							marginHorizontal: 20, 
							justifyContent: "center",
						}}>
							<Text>{item.key}</Text>
							<Image style={{ 
								borderRadius: 10, 
								width: 600,  
								height: 395,
								borderColor: "#bebebe",
								borderWidth: 1 
							}} source={{uri: item.image}}/>
						</TouchableOpacity>
							
					)}
				/>
			</View>


			<TouchableOpacity style={{alignItems: "center", marginTop: 50}} onPress={() => { 
				this.getVedio() 
			}}>
				<Text> Reload </Text>
			</TouchableOpacity>

			</ImageBackground>
			
    );
  }
}