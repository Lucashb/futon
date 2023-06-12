import React, { useState, useEffect, useRef} from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JogoAoVivo from '../JogoAovivo';
import AoVivo from '../AoVivo';

const Stack = createNativeStackNavigator();

export default function Main() {

  return (
    <NavigationContainer>
        <Stack.Navigator >
        <Stack.Screen 
        name="AoVivo"
        component={AoVivo}
        options={{
          headerShown: false
         }}/>
        <Stack.Screen 
        name="JogoAovivo"
        component={JogoAoVivo}
        options={{
          headerShown: false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}