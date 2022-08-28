import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import MapView, { Marker, Polyline  } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions} from 'react-native';

const { width, height } = Dimensions.get("screen");

export default function App() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);

  function generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
  }

  function newMarker(e){
    let dados = {
      key: markers.length,
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      pinColor: generateColor()
    }

    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

    setMarkers(oldArray => [...oldArray, dados])
  }

  return (
    <View style={styles.container}>
      <MapView
        style = {{width: width, height: height}}
        region = {region}
        zoomEnabled = {true}
        minZoomLevel = {10}
        showsUserLocation = {true}
        loadingEnabled = {true}
        onPress = {(e) => newMarker(e)}
      >
        {markers.map(marker => {
          return (
            <Marker key={marker.key} coordinate = {marker.coords} pinColor= {marker.pinColor} onPress = {() => 
              alert("Latitude: "+ "\n"+
               marker.coords.latitude + "\n" +
               "Longitude: "+ "\n"+ 
               marker.coords.longitude) } />
          )
        } )}
        <Polyline
          coordinates={markers.map(marker => { return { latitude: marker.coords.latitude, longitude: marker.coords.longitude }})}
          strokeColor="#000"
          strokeWidth={6}
        /> 
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
