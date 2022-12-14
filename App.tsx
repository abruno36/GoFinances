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
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import theme from './src/global/styles/theme';

import { Routes } from './src/routes';
import { AppRoutes } from './src/routes/app.routes';

import { SignIn } from './src/screens/SignIn';

import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
  const [canShow, setCanShow] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();
   
  if (!fontsLoaded || userStorageLoading) {
    return null;
  }
  
  if (canShow === false) {
    setTimeout(() => {
      setCanShow(true);
    }, 3000);

    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex:1 }}>
      <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content"/>
            <AuthProvider>
                <Routes />
            </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
