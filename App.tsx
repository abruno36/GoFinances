import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from "react-native";

import {
  useFonts, //hooks de fontes
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  const [canShow, setCanShow] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (fontsLoaded === false) {
    return null;
  }
  
  if (canShow === false) {
    setTimeout(() => {
      setCanShow(true);
    }, 3000);

    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex:1}}>
      <StatusBar barStyle="light-content" backgroundColor="#969CB2" />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
            <AppRoutes/>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
