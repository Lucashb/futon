import React, { useState, useEffect} from 'react';
import { AppOpenAdProvider} from '@react-native-admob/admob';
import Main from './src/Main';
import { View, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

export default function App() {
  const [splashDismissed, setSplashDismissed] = useState(false);

  const getFCMToken = async () => {
    try {

      const token = await messaging().getToken();
      
      try {
        axios.get(`https://palpiteirosws.herokuapp.com/buscaNotificacoesPorToken/${token}`)
        .then((res) => {
            if(!res.data.length){
                if(res.data.token !== null || res.data.token !== 'undefined'){
                    try {
                        axios.post(`https://palpiteirosws.herokuapp.com/insereNotificacoes`, {token: token})
                        .then((res) => {
                        
                        })
                        .catch((error) => {
                            Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
                        });
                    } catch (e) {
                        Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!')
                    }
                }
            }
        })
        .catch(err => Alert.alert('Atualizando Informacoes, tente novamente dentro de instantes !!!'))
    } catch {
        Alert.alert('Atualizando informacoes, tente novamente mais tarde !!!')
    }

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    getFCMToken();

    messaging().onMessage(async remoteMessage => {
      //console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      //console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      //console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  return (
    
    <AppOpenAdProvider
    unitId={"ca-app-pub-7510279083155970/9521161322"}
    options={{ showOnColdStart: true, loadOnDismissed: splashDismissed }}
    >
            
        <View style={{ flex: 1,  backgroundColor: '#12131C'}}>
          
          <Main />
            
        </View>

    </AppOpenAdProvider>
  );
}