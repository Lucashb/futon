import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, ScrollView, Linking, Alert, Platform, StatusBar } from "react-native";
import WebView from 'react-native-webview';
import axios from 'axios';
import moment from 'moment';
import { BannerAd, BannerAdSize, RewardedAd, RewardedAdEventType, TestIds, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';

const larguraCard = Math.round(Dimensions.get('window').width);
const adUnitId = 'ca-app-pub-7510279083155970/3450576995';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

export default function AoVivo(props){
    const navigation = useNavigation();
    const [responseAPI, setResponseAPI] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{

        navigation.addListener('focus', ()=> {
        
            getJogos();

        })
        
    },[]);

    function formataPartida(aux){
        var dataFormatada = moment(aux).format("DD/MM hh:mm a");
        return dataFormatada;
    }

    function AssistirAoVivo(aux){
        
        try{
            interstitial.show();
        } catch {
            interstitial.load();;
        }
        
        navigation.navigate('JogoAovivo',{urlJogAoVivoProps: aux.url_jogo})
    }

    const getJogos = () => {

        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          setLoaded(true);
        });
    
        // Start loading the interstitial straight away
        interstitial.load();
        
        // Unsubscribe from events on unmount
        try {
            axios.get('https://palpiteirosws.herokuapp.com/buscaJogosaovivos')
            .then((res) => {
                setResponseAPI(res.data)
            })
            .catch((error) => {
            Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
            })
        } catch (e) {
            Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
        }
    }

    function Tela({aux}){
        return(
            <View
            style={styles.background}>
                <TouchableOpacity 
                style={styles.cardOpacityPalpitado}
                onPress={() => {AssistirAoVivo(aux)}}
                >
                    <View style={styles.dataPartida}>
                        <Text style={styles.texto}>
                            {aux.campeonato}
                        </Text>
                    </View>
                    <View style={styles.dadosdoJogo}>
                        <View style={styles.dadosdoJogoDivididos}>
                            <Image 
                            style={{width: 50, height: 50}}
                            Image source={{uri: aux.escudoTimeCasa}} 
                            />
                            <Text style={styles.textoNomeTime}>{aux.nomeTimeCasa}</Text>
                        </View>
                        <View 
                        style={styles.dadosdoJogoDivididos}>
                            <Text style={styles.textoPlacar}>  X  </Text>
                        </View>
                        <View style={styles.dadosdoJogoDivididos}>
                            <Image 
                            style={{width: 50, height: 50}}
                            Image source={{uri: aux.escudoTimeFora}} 
                            />
                            <Text style={styles.textoNomeTime}>{aux.nomeTimeFora}</Text>
                        </View>
                    </View>
                    <View style={styles.dataPartida}>
                        <Text style={styles.texto}>
                            {aux.data_partida ? formataPartida(aux.data_partida) : 'DEFAULT'} 
                        </Text>
                    </View>
                    

                     
                        <View style={styles.cardOpacityAssitir}>
                            <Text style={styles.textoAssistir}>
                                ASSISTIR AO VIVO
                            </Text>
                        </View>
                    
                </TouchableOpacity>
            </View>
        );
    }

    return(
        
        <ScrollView  
        contentContainerStyle={styles.background}
        horizontal={true}>
            
            <BannerAd
            unitId={'ca-app-pub-7510279083155970/5941008967'}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={(error) => console.error(error)}
            />

            <Text style={styles.textoAmarelo}>Jogos do dia</Text>

            <FlatList 
            data={responseAPI}
            keyExtractor={item=>item.id}
            renderItem={({item} )=> <Tela aux={item}/>}
            refreshing={refreshing}
            onRefresh={() => {
            setRefreshing(true)
            getJogos()
            setRefreshing(false)
            }}
            />

        </ScrollView>

    )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#12131C',
    alignItems: 'center',
    flexDirection: 'column'
  },
  cardOpacityPalpitado: {
    flex: 1,
    width: larguraCard - 20,
    backgroundColor: '#20212A', //20212A
    height: 180,
    // Fundo do card
    elevation: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  cardOpacityAssitir: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#12131C', //20212A
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  dadosdoJogo:{
    flexDirection: 'row',
  },
  dadosdoJogoDivididos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  texto:{
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    color: '#F5C343',
  },
  textoNomeTime:{
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    color: '#FFFFFF',
  },
  textoAssistir:{
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#59C28A',
  },
  textoEncerrado:{
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#da241c',
  },
  textoPlacar:{
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: 25,
    color: '#C1C1C1',
  },
  dataPartida:{
    alignItems: 'center',
    fontSize: 15,
    color: '#C1C1C1',
  },
  textoAmarelo:{
    textAlign: 'center',
    fontSize: 25,
    color: '#F5C343',
    marginVertical: 15
  }
})