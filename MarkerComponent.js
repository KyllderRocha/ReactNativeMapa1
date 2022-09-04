import { FontAwesome } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MarkerComponent() {
 

  return (
    <Marker key={marker.key} coordinate = {marker.coords} pinColor= {marker.pinColor} onPress = {() => 
    alert("Latitude: "+ "\n"+
      marker.coords.latitude + "\n" +
      "Longitude: "+ "\n"+ 
      marker.coords.longitude) } >
        
      </Marker>
  );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    button: {
        position:'absolute',
        bottom: 20,
        left: 20
    },
    text: {
        size: 20,
        color:'#FFF',
        marginBottom: 13,
    },
    buttonFoto: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: 20,
        borderRadius: 10,
        height: 50,
    }
  });
  