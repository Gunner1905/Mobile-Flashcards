import React, { Component } from "react";
import { Platform, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function ExclusiveButton({ children, onPress, style = {}, textStyle = {}, outline }) {
  return (
   <View>
   {Platform.OS === 'android'
	  ? <TouchableOpacity
		  style={[
			styles.AndroidSubmitBtn,
			outline ? {
			  backgroundColor: 'black',
			  borderColor: 'purple',
			  borderWidth: 1
			} : {},
			style
		  ]}
		  onPress={onPress}
		>
		  <Text style={[
			styles.submitBtnText,
			outline ? { color: 'white' } : {},
			textStyle
		  ]}>{children}</Text>
		</TouchableOpacity>
	   
	  : <TouchableOpacity
		  style={[
			styles.IosSubmitBtn,
			outline ? {
			  backgroundColor: 'white',
			  borderColor: 'purple',
			  borderWidth: 1
			} : {},
			style
		  ]}
		  onPress={onPress}
		>
		  <Text style={[
			styles.submitBtnText,
			outline ? { color: 'purple' } : {},
			textStyle
		  ]}>{children}</Text>
		</TouchableOpacity>
   }
	</View>
  );
}


const styles = StyleSheet.create({
  IosSubmitBtn: {
	backgroundColor: 'white',
	borderColor: 'purple',
	borderWidth: 1,
	borderRadius: 3,
	padding: 5,
	paddingLeft: 25,
	paddingRight: 25,
  },
  AndroidSubmitBtn: {
    backgroundColor: 'black',
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    height: 45,
    borderRadius: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  }
});