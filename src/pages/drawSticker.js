
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'

import LookStory_BG from '../assets/images/LookStory/BG.png'
import Redo from '../assets/images/EditStory/btn_redo.png'
import Reback from '../assets/images/DrawStory/btn_reback.png'
import Eraser from '../assets/images/DrawStory/btn_eraser.png'
import Plus from '../assets/images/DrawStory/btn_penPlus.png'
import Delet from '../assets/images/LookStory/Btn_delete.png'
import Camera from '../assets/images/DrawStory/btn_camera.png'

export default class DrawSticker extends React.Component {
	render() {
		return (
			<ImageBackground source={LookStory_BG} style={{flex: 1}}>


				<View style={{
					position: 'absolute',
					width: 801,
					height: 561,
					bottom: 54.5,
					right: 40,
					backgroundColor: "#f6f6f6",
					overflow: 'hidden',
					borderRadius: 15,
					borderColor: "#f6f6f6",
					borderWidth: 10,
				}}>


				<View ref="svg" collapsable={false} style={{
					position: 'absolute',
					width: 404,
					height: 404,              
					borderRadius: 15,
					borderColor: "#000000",
					borderWidth: 2,
					left: 190,
					top: 60,
					borderStyle: 'dashed',
				}}>
					<View 
					style={{ 
						overflow: 'hidden',
						width: 400,
						height: 400,
						}}>
					</View>
				</View>
						
			
					<RNSketchCanvas
						containerStyle={{ flex: 1, }}
						canvasStyle={{ flex: 1, }}
						defaultStrokeIndex={0}
						defaultStrokeWidth={6}
						strokeComponent={color => (
							<View style={[{ backgroundColor: color, opacity: 0.5 }, styles.strokeColorButton]} />
						)}
						strokeSelectedComponent={(color, index, changed) => {
							return (
								<View style={[{ backgroundColor: color, opacity: 1 }, styles.strokeColorButton]} />
							)
						}}
						strokeWidthComponent={(w) => {
							return (
								<View style={styles.strokeWidthButton}>
									<Image style={{ width: 48, height: 48 }} source={Plus}/>
								</View>
							)
						}}
						undoComponent={
							<Image style={{ width: 48, height: 48, right: 20 }} source={Reback}/>
						}
						clearComponent={
							<Image style={{ width: 48, height: 48 }} source={Redo}/>
						}
						eraseComponent={
							<Image style={{ width: 48, height: 48 }} source={Eraser}/>
						}>

					</RNSketchCanvas>
				


				</View>
			</ImageBackground>
		);
	}
}


const styles = StyleSheet.create({
  strokeColorButton: {
    marginHorizontal: 2.5, 
    marginVertical: 8, 
    width: 30, 
    height: 30, 
    borderRadius: 15,
    flexDirection: 'column'
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A', right: 575,
  },
});