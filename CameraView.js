import { FontAwesome } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';

export default function CameraView() {
  const camRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            requestPermission(status === 'granted');
        })();
    }, []);

  if (permission === null){
    return <View/>;
  } 
  if (permission ===  false){
    return <Text> Acesso negado! </Text>
  } 

  function toggleCameraType() {
    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }

  async function takePicture(){
    let option = {
        quelity: 1,
        base64: true,
        exif: false,
    };
    if(camRef){
        // const data = await camRef.current.takePictureAsync(option);
        // setCapturedPhoto(data.base64);
        const data = await camRef.current.takePictureAsync();
        setCapturedPhoto(data.uri);
        setOpen(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref = {camRef} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraType}>
            <Text style={styles.text}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity
      style={styles.buttonFoto}
      onPress={takePicture}>
          <FontAwesome name='camera' size={23} color='#FFF'></FontAwesome>
      </TouchableOpacity>
      { capturedPhoto && 
      <Modal 
      animationType='slide'
      transparent = {false}
      visible = {open}
      >
        <View style={styles.imagem}>
          <TouchableOpacity style={{margin: 10}} onPress = {() => setOpen(false)}> 
            <FontAwesome name='window-close' size={50} color="#FF0000"></FontAwesome>
          </TouchableOpacity>

          <Image
            style={{ with: 100, height: 300, borderRadius: 20 }}
            source={{uri: capturedPhoto }}
            // source={{uri: 'data:image/jpg;base64,'+ capturedPhoto }}
          />
          {console.log(capturedPhoto)}
        </View>
      </Modal>
      }
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    camera: {
        flex: 1,
        marginTop:40,
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
    },
    imagem:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    }
  });
  