import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Linking, Alert, Platform, StatusBar } from "react-native";
import WebView from 'react-native-webview';


export default function JogoAoVivo(props){
    const [dados, setDados] = useState();
    const navigation = useNavigation();

  useEffect(()=>{

    navigation.addListener('focus', ()=> {
      
      setDados(props.route.params.urlJogAoVivoProps)

    })

  },[]);

    return(
        
          
        <WebView

        allowsFullscreenVideo={true}
        
        mediaPlaybackRequiresUserAction={false}
        style={{width: '100%', height: '100%'}}
        source={{uri: dados}}
        style={styles.background}
        >
          <StatusBar hidden={true} /> 
        </WebView>

    )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#12131C',
    alignItems: 'center',
    flexDirection: 'column'
  },
  texto:{
    textAlign: 'center',
    fontSize: 20,
    color: '#F5C343',
  },
})  