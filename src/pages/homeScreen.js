
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class HomeScreen extends React.Component {

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}> Record </Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}> Stop </Text>
			</TouchableOpacity>

			</View>
		);
	}
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#406E9F',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});