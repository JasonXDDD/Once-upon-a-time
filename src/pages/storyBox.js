
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, CameraRoll} from 'react-native';
import RNFS from 'react-native-fs';

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
    .then((data) => this.setState({ images: data.edges }));
	}

  render() {
    return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.images}
					renderItem={({item}) => (
							<Image
								style={{width: 100, height: 100}}
								source={{uri: item.node.image.uri}}
							/>
					)}
				/>

				<TouchableOpacity>
					<Text onPress={() => { 
					this.getVedio()
        }}> Stop </Text>
				</TouchableOpacity>
			</View>
			
    );
  }
}